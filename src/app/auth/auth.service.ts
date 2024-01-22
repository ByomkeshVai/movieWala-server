import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import config from '../config';
import { createToken, verifyToken } from './auth.utils';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { format } from 'date-fns';
import DulicatePassword from '../errors/duplicatePasswordError';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByUserName(payload.username);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
  }

  if (userStatus === 'in-progress') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is not active yet!');
  }

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not match');
  }

  const jwtPayload = {
    _id: user._id,
    role: user.role,
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { email, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  }

  if (userStatus === 'in-progress') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is not active yet !');
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    _id: user._id,
    role: user.role,
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { currentPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistsByEmail(userData.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const isCurrentPasswordMatched = await User.isPasswordMatched(
    payload.currentPassword,
    user?.password,
  );

  if (!isCurrentPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Current password does not match');
  }

  const compareCurrentPassword = await bcrypt.compare(
    payload.newPassword,
    user?.password || '',
  );

  if (compareCurrentPassword) {
    throw new DulicatePassword(
      httpStatus.BAD_REQUEST,
      `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${
        user.passwordChangedAt
          ? user.passwordChangedAt
          : (user as any).createdAt
      })`,
    );
  }

  const passwordHistory = user?.passwordHistory;
  if (passwordHistory) {
    const lastPassChange = passwordHistory[0]?.password as string;
    const lastPassChangeTimestamp = passwordHistory?.[0]?.timestamp as Date;

    const compareOldPassword = await bcrypt.compare(
      payload.newPassword,
      lastPassChange || '',
    );

    if (compareOldPassword) {
      const formattedLastUsedTimestamp = lastPassChangeTimestamp
        ? format(lastPassChangeTimestamp, "yyyy-MM-dd 'at' HH:mm:ss")
        : 'unknown';

      throw new DulicatePassword(
        httpStatus.BAD_REQUEST,
        `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${formattedLastUsedTimestamp})`,
      );
    }

    const lastPassChangeZero = passwordHistory[1]?.password as string;
    const lastPassChangeTimestampZero = passwordHistory?.[1]?.timestamp as Date;

    const compareOldPasswordZero = await bcrypt.compare(
      payload.newPassword,
      lastPassChangeZero || '',
    );

    if (compareOldPasswordZero) {
      const formattedLastUsedTimestampZero = lastPassChangeTimestampZero
        ? format(lastPassChangeTimestampZero, "yyyy-MM-dd 'at' HH:mm:ss")
        : 'unknown';

      throw new DulicatePassword(
        httpStatus.BAD_REQUEST,
        `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${formattedLastUsedTimestampZero})`,
      );
    }

    const lastPassChangeTwo = passwordHistory[2]?.password as string;
    const lastPassChangeTimestampTwo = passwordHistory?.[2]?.timestamp as Date;

    const compareOldPasswordTwo = await bcrypt.compare(
      payload.newPassword,
      lastPassChangeTwo || '',
    );

    if (compareOldPasswordTwo) {
      const formattedLastUsedTimestamp = lastPassChangeTimestampTwo
        ? format(lastPassChangeTimestampTwo, "yyyy-MM-dd 'at' HH:mm:ss")
        : 'unknown';

      throw new DulicatePassword(
        httpStatus.BAD_REQUEST,
        `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${formattedLastUsedTimestamp})`,
      );
    }
  }

  const hashedNewPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const updatedUser = await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      $set: {
        password: hashedNewPassword,
        passwordChangedAt: new Date(),
      },
      $push: {
        passwordHistory: {
          $each: [{ password: hashedNewPassword, timestamp: new Date() }],
          $position: 0,
          $slice: -3,
        },
      },
    },
    { new: true },
  );

  if (!updatedUser) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update user information',
    );
  }

  return updatedUser;
};

export const AuthService = {
  loginUser,
  changePassword,
  refreshToken,
};
