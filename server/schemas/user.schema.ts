import { z, object, string } from 'zod';
import { ObjectId } from 'mongodb';

export const userSchema = object({
  _id: z.instanceof(ObjectId),
  name: string({ required_error: 'Name is required' }).min(1),
  email: string({ required_error: 'Email is required' }).email(
    'Invalid email'
  ),
  password: string({ required_error: 'Password is required' })
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters')
    .optional()
});

export const registerUserSchema = object({
  body: userSchema.omit({ _id: true }).required()
});

export const loginUserSchema = object({
  body: userSchema.omit({ name: true, _id: true }).required()
});

export type User = z.infer<typeof userSchema>;
export type RegisterUserSchema = z.infer<typeof registerUserSchema>['body'];
export type LoginUserInput = z.infer<typeof loginUserSchema>['body'];
