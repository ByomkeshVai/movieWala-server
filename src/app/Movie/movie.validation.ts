import { z } from 'zod';

const CreateMovieValidationSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  quality: z.enum(['high', 'low', 'medium']),
  genres: z.array(z.string()),
  languages: z.array(z.string()),
  tags: z.array(z.string()),
  movieLink: z.array(z.string()),
  trailerLink: z.string(),
  posterImage: z.string().optional(),
  isDeleted: z.boolean().default(false),
});

export const MovieValidations = {
  CreateMovieValidationSchema,
};
