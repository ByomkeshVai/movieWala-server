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
    message: 'Language retrieved successfully',
    data: result,
  });
});

const deleteLanguage = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await LanguageServices.deleteLanguageDB(id);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Language Delete Successfully',
    data: result,
  });
});

const getSingleLanguage = catchAsync(async (req, res) => {
  const id = req.params.LanguageID;
  const result = await LanguageServices.getSingleLanguageFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Language retrieved successfully',
    data: result,
  });
});

const updateLanguage = catchAsync(async (req, res) => {
  const { LanguageID } = req.params;
  const result = await LanguageServices.updateLanguageDB(LanguageID, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Language is updated Successfully',
    data: result,
  });
});

export const LanguageController = {
  createLanguage,
  getAllLanguage,
  deleteLanguage,
  getSingleLanguage,
  updateLanguage,
};
