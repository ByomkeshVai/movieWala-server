import express, { NextFunction, Request, Response } from 'express';
import { upload } from '../utils/sendImageToCloudinary';
import validateRequest from '../middlewares/validateRequest';
import { MovieValidations } from './movie.validation';
import { movieControllers } from './movie.controller';

const router = express.Router();

router.post(
  '/create-movie',
  // auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(MovieValidations.CreateMovieValidationSchema),
  movieControllers.createMovie,
);

export const MovieRoutes = router;
