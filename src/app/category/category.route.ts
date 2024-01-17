import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { CategoryValidations } from './category.validation';
import { CategoryController } from './category.controller';
import auth from '../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  validateRequest(CategoryValidations.CreateCategoryValidationSchema),
  // auth(USER_ROLE.admin, USER_ROLE.moderator),
  CategoryController.createCategory,
);

router.delete('/:id', CategoryController.deleteCategory);

router.get('/', CategoryController.getAllCategory);

router.get('/:categoryID', CategoryController.getSingleCategory);

export const CategoryRoutes = router;
