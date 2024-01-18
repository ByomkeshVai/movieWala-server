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

export const movieControllers = {
  createMovie,
};
