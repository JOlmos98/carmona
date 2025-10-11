// /lib/prisma.ts

import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: { prismaGlobal: ReturnType<typeof prismaClientSingleton> } & typeof global;

// CAMBIA ESTO:
// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()
// export default prisma

// POR ESTO:
export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton(); // Añade 'export' aquí

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;

// import { PrismaClient } from '@prisma/client'

// const prismaClientSingleton = () => {
//   return new PrismaClient()
// }

// declare const globalThis: {
//   prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// } & typeof global;

// const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

// export default prisma

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
