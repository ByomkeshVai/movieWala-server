import { Router } from 'express';
import { CategoryRoutes } from '../category/category.route';
import { AuthRoutes } from '../auth/auth.route';
import { GenreRoutes } from '../Genre/genre.route';
import { LanguageRoutes } from '../Language/language.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/genres',
    route: GenreRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/languages',
    route: LanguageRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
