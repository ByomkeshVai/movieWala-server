import { GenreServices } from './genre.service';
import sendResponse from '../utils/sendRequest';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';

const createGenre = catchAsync(async (req, res) => {
  const result = await GenreServices.createGenreDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Genre created Successfully',
    data: result,
  });
});

const getAllGenre = catchAsync(async (req, res) => {
  const result = await GenreServices.getAllGenreFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Genre retrieved successfully',
    data: result,
  });
});

const deleteGenre = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await GenreServices.deleteGenreDB(id);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Genre Delete Successfully',
    data: result,
  });
});

const getSingleGenre = catchAsync(async (req, res) => {
  const id = req.params.GenreID;
  const result = await GenreServices.getSingleGenreFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Genre retrieved successfully',
    data: result,
  });
});

const updateGenre = catchAsync(async (req, res) => {
  const { GenreID } = req.params;
  const result = await GenreServices.updateGenreDB(GenreID, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Genre is updated Successfully',
    data: result,
  });
});

export const GenreController = {
  createGenre,
  getAllGenre,
  deleteGenre,
  getSingleGenre,
  updateGenre,
};
