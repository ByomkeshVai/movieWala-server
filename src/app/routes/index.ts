import { Router } from 'express';
import { CategoryRoutes } from '../category/category.route';
import { AuthRoutes } from '../auth/auth.route';
import { GenreRoutes } from '../Genre/genre.route';
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
