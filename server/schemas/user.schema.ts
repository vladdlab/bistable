import { z, object, string } from 'zod';
import { ObjectId, Binary } from 'mongodb';

export interface User {
  _id?: ObjectId,
  name: string,
  email: string,
  password: string | Binary
}

export const userSchema = object({
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
  body: userSchema.required()
});

export const loginUserSchema = object({
  body: userSchema.omit({ name: true }).required()
});

export type RegisterUserInput = z.infer<typeof registerUserSchema>['body'];
export type LoginUserInput = z.infer<typeof loginUserSchema>['body'];
