import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendRequest';
import { MovieServices } from './movie.service';

const createMovie = catchAsync(async (req, res) => {
  const movieData = req.body;

  const result = await MovieServices.createMovieDB(movieData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Movie is created Successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await MovieServices.getAllMovieFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Movie are retrieved successfully',
    data: result,
  });
});

const getSingleMovie = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await MovieServices.getSingleMovieFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Movie is retrieved successfully',
    data: result,
  });
});

export const movieControllers = {
  createMovie,
  getAllCourses,
  getSingleMovie,
};
