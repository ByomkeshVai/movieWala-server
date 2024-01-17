import httpStatus from 'http-status';
import { TGenre } from './genre.interface';
import AppError from '../errors/AppError';
import Genre from './genre.model';

const createGenreDB = async (payload: TGenre) => {
  const result = await Genre.create(payload);
  return result;
};

const getAllGenreFromDB = async () => {
  try {
    const result = await Genre.find({ isDeleted: false });
    return { genres: result };
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const deleteGenreDB = async (id: string) => {
  try {
    const result = await Genre.findByIdAndUpdate(
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

const getSingleGenreFromDB = async (genreID: string) => {
  try {
    const courseFind = await Genre.findById(genreID);

    if (!courseFind) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Genre not found');
    }

    const genreData = courseFind.toObject();

    const result = {
      genres: genreData,
    };

    return result;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const updateGenreDB = async (genreID: string, Payload: TGenre) => {
  const updateBasicInfo = await Genre.findByIdAndUpdate(genreID, Payload, {
    new: true,
    runValidators: true,
  });

  if (!updateBasicInfo) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Genre!');
  }

  return updateBasicInfo;
};

export const GenreServices = {
  createGenreDB,
  getAllGenreFromDB,
  deleteGenreDB,
  getSingleGenreFromDB,
  updateGenreDB,
};
