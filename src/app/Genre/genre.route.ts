import express from 'express';
import validateRequest from '../middlewares/validateRequest';
import { GenreValidations } from './genre.validation';
import { GenreController } from './genre.controller';
import auth from '../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  validateRequest(GenreValidations.CreateGenreValidationSchema),
  // auth(USER_ROLE.admin, USER_ROLE.moderator),
  GenreController.createGenre,
);

router.put(
  '/:genreID',
  validateRequest(GenreValidations.CreateGenreValidationSchema),
  // auth(USER_ROLE.admin, USER_ROLE.moderator),
  GenreController.updateGenre,
);

router.delete('/:id', GenreController.deleteGenre);

router.get('/', GenreController.getAllGenre);

router.get('/:genreID', GenreController.getSingleGenre);

export const GenreRoutes = router;
