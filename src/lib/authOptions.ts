









// src/lib/authOptions.ts

// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";

// // Inicializa el cliente de Prisma
// const prisma = new PrismaClient();

// export const authOptions: NextAuthOptions = {
//     // Usamos el adaptador de Prisma para que Next-Auth pueda interactuar con tu DB de Neon
//     adapter: PrismaAdapter(prisma),

//     // Aquí defines los proveedores de autenticación (Credenciales, Google, GitHub, etc.)
//     providers: [
//         CredentialsProvider({
//             name: "credentials",
//             credentials: {
//                 email: { label: "Email", type: "text" },
//                 password: { label: "Password", type: "password" },
//             },
//             // La lógica de autorización
//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials?.password) {
//                     throw new Error("Credenciales inválidas");
//                 }

//                 // 1. Buscar el usuario en la base de datos con Prisma
//                 const user = await prisma.user.findUnique({
//                     where: { email: credentials.email },
//                 });

//                 // Si no se encuentra el usuario o no ha verificado su email
//                 if (!user || !user.isVerified) {
//                     console.log("Usuario no encontrado o no verificado");
//                     return null;
//                 }

//                 // 2. Comparar la contraseña del formulario con la hasheada en la DB
//                 const isPasswordCorrect = await bcrypt.compare(
//                     credentials.password,
//                     user.password // Tu modelo User tiene el campo 'password'
//                 );

//                 if (!isPasswordCorrect) {
//                     console.log("Contraseña incorrecta");
//                     return null;
//                 }
                
//                 // 3. Si todo es correcto, devuelve el objeto usuario
//                 // Next-Auth se encargará de crear la sesión
//                 return {
//                     id: user.id.toString(), // Next-Auth espera el id como string
//                     email: user.email,
//                     name: user.userName,
//                 };
//             },
//         }),
//     ],

//     // Define la estrategia de sesión (JWT es la recomendada)
//     session: {
//         strategy: "jwt",
//     },

//     // Clave secreta para firmar los JWT
//     secret: process.env.NEXTAUTH_SECRET,

//     // Páginas personalizadas
//     pages: {
//         signIn: "/login", // Redirige aquí si el usuario no está autenticado
//     },

//     // Callbacks para controlar el JWT y la sesión
//     callbacks: {
//         // Este callback se ejecuta cuando se crea o actualiza un JWT
//         async jwt({ token, user }) {
//             if (user) {
//                 token.id = user.id; // Añade el ID del usuario al token
//             }
//             return token;
//         },
//         // Este callback se ejecuta cuando se accede a la sesión
//         async session({ session, token }) {
//             if (session.user) {
//                 session.user.id = token.id as string; // Añade el ID del usuario a la sesión
//             }
//             return session;
//         },
//     },
// };













// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import { eq } from "drizzle-orm";
// import { users } from "../../drizzle/schema";
// import { db } from "../../drizzle";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "test@test.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           if (!credentials?.email || !credentials?.password) {          // Verificar que se proporcionaron credenciales
//             return null;
//           }

//           const user = await db.query.users.findFirst({                 // Buscar el usuario por email en la base de datos
//             where: eq(users.email, credentials.email),
//           });

//           // console.warn("User: ", user);

//           if (!user) {
//             console.log("Usuario no encontrado");
//             return null;
//           }

//           const passwordMatch = await bcrypt.compare(
//             credentials.password,
//             user.passwordHash
//           );

//           if (!passwordMatch) {
//             console.warn("Contraseña incorrecta");
//             return null;
//           }

//           if (!user.isVerified) return null;

//           return {
//             id: user.id.toString(),
//             name: user.name,
//             email: user.email,
//             role: user.isVerified ? "verified_user" : "user",
//             lastName: user.lastName,
//             avatarUrl: user.avatarUrl || null,
//           };
//         } catch (error) {
//           console.error("Error de autenticación:", error);
//           return null;
//         }
//       },
//     }),
//   ],

//   pages: {
//     signIn: `/login`,
//     error: '/auth/error',
//   },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//         token.lastName = user.lastName;
//         token.avatarUrl = user.avatarUrl;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if (token && session.user) {
//         session.user.id = token.id as string;
//         session.user.role = token.role as string;
//         session.user.lastName = token.lastName as string;
//         session.user.avatarUrl = token.avatarUrl as string | null;
//       }
//       return session;
//     },
//   },

//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, //30 días
//   },

//   debug: false, //process.env.NODE_ENV === "development",
// };
