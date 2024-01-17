import { CategoryServices } from './category.service';
import sendResponse from '../utils/sendRequest';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Category created Successfully',
    data: result,
  });
});

const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoryFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Categories retrieved successfully',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.deleteCategoryDB(id);
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Category Delete Successfully',
    data: result,
  });
});

const getSingleCategory = catchAsync(async (req, res) => {
  const id = req.params.categoryID;
  const result = await CategoryServices.getSingleCategoryFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successfully',
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const { categoryID } = req.params;
  const result = await CategoryServices.updateCategoryDB(categoryID, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category is updated succesfully',
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
  deleteCategory,
  getSingleCategory,
  updateCategory,
};
