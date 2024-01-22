import { z } from 'zod';

const roleEnum = z.enum(['admin', 'user']);
const statusEnum = z.enum(['active', 'blocked', 'in-progress']);

const createUserSchemaValidation = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  // .refine(
  //   (value) =>
  //     /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/.test(
  //       value,
  //     ),
  //   {
  //     message:
  //       'Password must be at least 8 characters long and include at least one uppercase letter and one special character.',
  //   },
  // ),
  passwordChangedAt: z.date().optional(),
  role: roleEnum,
  status: statusEnum.default('in-progress'),
  isDeleted: z.boolean().default(false),
});

export const UserValidations = {
  createUserSchemaValidation,
};
