import httpStatus from 'http-status';
import { TLanguage } from './language.interface';
import AppError from '../errors/AppError';
import Language from './language.model';

const createLanguageDB = async (payload: TLanguage) => {
  const result = await Language.create(payload);
  return result;
};

const getAllLanguageFromDB = async () => {
  try {
    const result = await Language.find({ isDeleted: false });
    return { languages: result };
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const deleteLanguageDB = async (id: string) => {
  try {
    const result = await Language.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
      },
    );
    return result;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const getSingleLanguageFromDB = async (languageID: string) => {
  try {
    const courseFind = await Language.findById(languageID);

    if (!courseFind) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Language not found');
    }

    const languageData = courseFind.toObject();

    const result = {
      languages: languageData,
    };

    return result;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const updateLanguageDB = async (languageID: string, Payload: TLanguage) => {
  const updateBasicInfo = await Language.findByIdAndUpdate(languageID, Payload, {
    new: true,
    runValidators: true,
  });

  if (!updateBasicInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Language!');
  }

  return updateBasicInfo;
};

export const LanguageServices = {
  createLanguageDB,
  getAllLanguageFromDB,
  deleteLanguageDB,
  getSingleLanguageFromDB,
  updateLanguageDB,
};
