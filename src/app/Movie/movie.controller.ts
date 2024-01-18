import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendRequest';
import { MovieServices } from './movie.service';

const createMovie = catchAsync(async (req, res) => {
  const { movie: movieData } = req.body;

  const result = await MovieServices.createMovieDB(movieData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created succesfully',
    data: result,
  });
});

export const movieControllers = {
  createMovie,
};
