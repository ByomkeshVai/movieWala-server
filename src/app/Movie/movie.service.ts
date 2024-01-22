import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import { TMovie } from './movie.interface';
import { Movie } from './movie.model';
import QueryBuilder from '../builder/QueryBuilder';
import { MovieSearchableFields } from './Movie.constant';

const createMovieDB = async (payload: TMovie) => {
  const userData = payload;

  const newMovie = await Movie.create(userData);
  if (!newMovie) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Movie');
  }

  return newMovie;
};

const getAllMovieFromDB = async (query: Record<string, unknown>) => {
  const movieQuery = new QueryBuilder(Movie.find({ isDeleted: false }), query)
    .search(MovieSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await movieQuery.modelQuery;
  const meta = await movieQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleMovieFromDB = async (id: string) => {
  const result = await Movie.findById(id);
  return result;
};

const deleteMovieFromDB = async (id: string) => {
  const result = await Movie.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const MovieServices = {
  createMovieDB,
  getAllMovieFromDB,
  getSingleMovieFromDB,
  deleteMovieFromDB,
};
