// import { authOptions } from "@/lib/authOptions"
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
import { credentialsSchema } from '@/zod/credentialsSchema';
import type { User as PrismaUser } from '@prisma/client';
import { ZodError } from 'zod';
import { logInSchema } from '@/zod/logInSchema';



export const { handlers, signIn, signOut, auth } = NextAuth({ adapter: PrismaAdapter(prisma),
     providers: [Google, GitHub, 
        Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'johndoe@gmail.com'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '********'
        }
      },
      authorize: async (credentials, _req) => {
        try {
          // 1) Validación server-side con Zod
          const { email, password } = await logInSchema.parseAsync(credentials);

          // 2) Buscar usuario en DB
          const user = await prisma.user.findUnique({ where: { email } });
          // Si no existe o fue creado por OAuth (password null), rechaza
          if (!user || !user.password) return null;

          // 3) Comparar contraseña
          const ok = await bcrypt.compare(password, user.password);
          if (!ok) return null;

          // 4) Devolver el usuario de Prisma (tipo compatible con el adapter)
          return user;
        } catch (err) {
          if (err instanceof ZodError) {
            // Credenciales inválidas por esquema => fallo de login
            return null;
          }
          // Otros errores: también fallamos el login sin exponer detalles
          return null;
        }
      }
    })
  ],
  // pages: { signIn: '/login' }, // opcional si usas página personalizada
});
  