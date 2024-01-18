import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import { TMovie } from './movie.interface';
import { Movie } from './movie.model';

const createMovieDB = async (payload: TMovie) => {
  const userData = payload;

  const newMovie = await Movie.create(userData);
  if (!newMovie) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Movie');
  }

  return newMovie;
};

export const MovieServices = {
  createMovieDB,
};
