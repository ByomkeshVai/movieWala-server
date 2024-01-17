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
    const result = await Category.find({ isDeleted: false });
    return { categories: result };
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const deleteCategoryDB = async (id: string) => {
  try {
    const result = await Category.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
      },
      {
        new: true,
      },
    );
    return result;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

const getSingleCategoryFromDB = async (categoryID: string) => {
  try {
    const courseFind = await Category.findById(categoryID);

    if (!courseFind) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Category not found');
    }

    const categoryData = courseFind.toObject();

    const result = {
      categories: categoryData,
    };

    return result;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const CategoryServices = {
  createCategoryDB,
  getAllCategoryFromDB,
  deleteCategoryDB,
  getSingleCategoryFromDB,
};
