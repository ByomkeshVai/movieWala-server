import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { LanguageValidations } from './language.validation';
import { LanguageController } from './language.controller';
import auth from '../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  validateRequest(LanguageValidations.CreateLanguageValidationSchema),
  auth(USER_ROLE.admin, USER_ROLE.moderator),
  LanguageController.createLanguage,
);

router.get('/', LanguageController.getAllLanguage);

export const LanguageRoutes = router;
