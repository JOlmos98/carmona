import { z } from 'zod';

export const signUpSchema = z
  .object({
    userName: z.string().min(2, { message: 'Name must be at least 2 characters long' }),

    email: z.string().email({ message: 'Invalid email address' }),

    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/, { message: 'Password must include letters, numbers, and symbols' }),

    repeatPassword: z.string()
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'] // Muestra el error en el campo de repetir contraseña
  });
