// src/app/api/signup/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { signUpSchema } from '@/zod/signUpSchema'; // Asegúrate de tener este schema
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = signUpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    const { userName, email, password } = parsed.data;

    // 1. Verificar si el usuario ya existe con Prisma
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ error: 'El email ya está en uso' }, { status: 409 });
    }

    // 2. Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Crear el usuario en la base de datos con Prisma
    await prisma.user.create({ data: { userName, email, password: hashedPassword } });

    // Lógica de verificación de email (es casi idéntica a la que tenías)
    const verificationToken = jwt.sign(
      { email },
      process.env.NEXTAUTH_SECRET!, // Reutilizamos el secret de NextAuth
      { expiresIn: '1d' }
    );

    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify-email?token=${verificationToken}`;

    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: process.env.EMAIL_FROM, pass: process.env.EMAIL_PASS } });

    await transporter.sendMail({
      to: email,
      from: process.env.EMAIL_FROM,
      subject: 'Verifica tu cuenta para Carmona',
      html: `
              <h1>¡Bienvenido a Carmona!</h1>
              <p>Por favor, haz clic en el siguiente enlace para verificar tu cuenta:</p>
              <a href="${verificationUrl}" style="padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verificar Email</a>
            `
    });

    return NextResponse.json({ message: 'Usuario creado. Por favor, verifica tu email.' }, { status: 201 });
  } catch (error) {
    console.error('Error en el registro:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
