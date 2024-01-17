import { z } from 'zod';

const CreateGenreValidationSchema = z.object({
  genre: z.string(),
});

export const GenreValidations = {
  CreateGenreValidationSchema,
};
