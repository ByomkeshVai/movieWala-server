import { z } from 'zod';

const CreateMovieValidationSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string(),
  quality: z.enum(['high', 'low', 'medium']),
  genres: z.array(z.string()),
  languages: z.array(z.string()),
  tags: z.array(z.string().min(1)),
  movieLink: z.array(z.string().min(1)),
  trailerLink: z.string().min(1),
  posterImage: z.string().optional(),
  isDeleted: z.boolean().default(false),
});

export const MovieValidations = {
  CreateMovieValidationSchema,
};
