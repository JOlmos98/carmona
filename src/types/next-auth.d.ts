// /src/types/next-auth.d.ts

import type { DefaultSession, User as DefaultUser } from 'next-auth';
import type { JWT as DefaultJWT } from 'next-auth/jwt';

// Extiende los tipos originales de Auth.js
declare module 'next-auth' {
  /**
   * Extiende el objeto User por defecto con tus campos personalizados.
   */
  interface User extends DefaultUser {
    userName: string;
    isVerified: boolean;
    isDonor: boolean;
    end0: boolean;
    end1: boolean;
    end2: boolean;
    end3: boolean;
    end4: boolean;
  }

  /**
   * Extiende el objeto Session para incluir tu objeto User personalizado.
   */
  interface Session extends DefaultSession {
    user: {
      id: string;
      userName: string;
      isDonor: boolean;
      // ...puedes añadir otros campos del usuario que quieras en la sesión
    } & DefaultSession['user']; // Mantiene los campos por defecto (name, email, image)
  }
}

// También es útil extender el token JWT
declare module 'next-auth/jwt' {
  /**
   * Extiende el token JWT para que pueda almacenar tus campos personalizados.
   */
  interface JWT extends DefaultJWT {
    id: string;
    userName: string;
    isDonor: boolean;
  }
}

// // types/next-auth.d.ts
// import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
// import { JWT } from "next-auth/jwt"

// declare module "next-auth" { //Extiende de next-auth
//   interface User {
//     id: string
//     role: string
//     lastName: string
//     avatarUrl?: string | null
//   }

//   interface Session {
//     user: {
//       id: string
//       role: string
//       lastName: string
//       avatarUrl?: string | null
//     } & DefaultSession["user"]
//   }
// }

// declare module "next-auth/jwt" { //Extiende de jwt
//   interface JWT {
//     id: string
//     role: string
//     lastName: string
//     avatarUrl?: string | null
//   }
// }
