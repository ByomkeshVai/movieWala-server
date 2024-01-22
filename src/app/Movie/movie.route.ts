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

router.get('/:id', movieControllers.getSingleMovie);

router.delete('/:id', movieControllers.deleteMovie);

router.get('/', movieControllers.getAllMovie);

router.put('/change-featured/:id', movieControllers.featuredMovie);

export const MovieRoutes = router;
