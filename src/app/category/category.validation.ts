import { z } from 'zod';

const CreateCategoryValidationSchema = z.object({
  category: z.string(),
});

export const CategoryValidations = {
  CreateCategoryValidationSchema,
};
