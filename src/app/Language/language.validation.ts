import { z } from 'zod';

const CreateLanguageValidationSchema = z.object({
  language: z.string(),
});

export const LanguageValidations = {
  CreateLanguageValidationSchema,
};
