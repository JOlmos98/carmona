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

//   last_name: z
//     .string()
//     .min(2, { message: "Last name must be at least 2 characters long" }),

// phone: z
//   .string()
//   .optional()
//   .transform(val => val === "" ? undefined : val)
//   .pipe(z.string().regex(/^[0-9]{7,}$/, "Phone must be numeric and at least 7 digits").optional()),

//   phone: z
//   .string()
//   .optional()
//   .transform(val => val?.trim() === "" ? undefined : val?.trim()) // "" → undefined
//   .refine(
//     val =>
//       val === undefined ||
//       /^\+?[0-9\s\-]{7,}$/.test(val), // admite "+" al principio, espacios y guiones
//     {
//       message: "Phone must start with '+' and have at least 7 digits",
//     }
//   ),

//   bio: z
//     .string()
//     .max(160, { message: "Bio must be less than 160 characters" })
//     .optional(),

//   website: z
//     .string()
//     .optional()
//     .transform(val => val === "" ? undefined : val)
//     .pipe(z.string().url("Website must be a valid URL").optional()),

//   subscribe: z
//     .boolean()
//     .optional(),

// });
