// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" { //Extiende de next-auth
  interface User {
    id: string
    role: string
    lastName: string
    avatarUrl?: string | null
  }

  interface Session {
    user: {
      id: string
      role: string
      lastName: string
      avatarUrl?: string | null
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" { //Extiende de jwt
  interface JWT {
    id: string
    role: string
    lastName: string
    avatarUrl?: string | null
  }
}