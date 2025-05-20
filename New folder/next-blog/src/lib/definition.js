import { z } from 'zod';

export const RegisterSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z.string().min(6, { message: 'Password is required' }).trim(),
});

export const BlogPostSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title must contain 1 character' })
    .max(100, { message: 'Title length maximum 100 character' })
    .trim(),
  content: z.string().min(1, 'Content must be 1 character').trim(),
  postId: z.string().optional(),
});
