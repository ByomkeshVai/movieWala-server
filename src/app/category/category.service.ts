import httpStatus from 'http-status';
import { TCategory } from './category.interface';
import Category from './category.model';
import AppError from '../errors/AppError';

const createCategoryDB = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};

const getAllCategoryFromDB = async () => {
  try {
    const result = await Category.find({});
    return { categories: result };
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const CategoryServices = {
  createCategoryDB,
  getAllCategoryFromDB,
};
