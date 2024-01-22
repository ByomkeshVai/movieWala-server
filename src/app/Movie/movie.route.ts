import express from 'express';

import validateRequest from '../middlewares/validateRequest';
import { MovieValidations } from './movie.validation';
import { movieControllers } from './movie.controller';

const router = express.Router();

router.post(
  '/create-movie',
  // auth(USER_ROLE.admin),
  validateRequest(MovieValidations.CreateMovieValidationSchema),
  movieControllers.createMovie,
);

export const MovieRoutes = router;
