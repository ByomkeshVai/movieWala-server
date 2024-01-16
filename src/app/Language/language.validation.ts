import { z } from 'zod';

const CreateLanguageValidationSchema = z.object({
  name: z.string(),
});

export const LanguageValidations = {
  CreateLanguageValidationSchema,
};
