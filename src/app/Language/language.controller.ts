import { LanguageServices } from './language.service';
import sendResponse from '../utils/sendRequest';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';

const createLanguage = catchAsync(async (req, res) => {
  const result = await LanguageServices.createLanguageDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Language created Successfully',
    data: result,
  });
});

const getAllLanguage = catchAsync(async (req, res) => {
  const result = await LanguageServices.getAllLanguageFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Languages retrieved successfully',
    data: result,
  });
});

export const LanguageController = {
  createLanguage,
  getAllLanguage,
};
