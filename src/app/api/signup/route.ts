import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const signUpBodySchema = z.object({
  userName: z.string().min(3).max(30).trim(),
  email: z.string().email(),
  password: z.string().min(8),
  recaptchaToken: z.string().min(10)
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = signUpBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const { userName, email, password, recaptchaToken } = parsed.data;

    // 1) Verificar reCAPTCHA v3
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      return NextResponse.json({ error: 'Recaptcha not configured' }, { status: 500 });
    }

    const params = new URLSearchParams();
    params.append('secret', secret);
    params.append('response', recaptchaToken);

    const recaptchaRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: params
    });
    const recaptchaJson = await recaptchaRes.json();

    // Puedes ajustar el umbral (0.5–0.7 es común)
    if (!recaptchaJson.success || (typeof recaptchaJson.score === 'number' && recaptchaJson.score < 0.5)) {
      return NextResponse.json({ error: 'Recaptcha failed' }, { status: 403 });
    }

    // 2) Comprobar duplicados
    const existingByEmail = await prisma.user.findUnique({ where: { email } });
    if (existingByEmail) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    // (Opcional) Si quieres forzar userName único:
    // Asegúrate de tener @unique en el schema para userName.
    const existingByUserName = await prisma.user.findUnique({ where: { userName } }).catch(() => null);
    if (existingByUserName) {
      return NextResponse.json({ error: 'Username already taken' }, { status: 409 });
    }

    // 3) Hash de la password
    const hash = await bcrypt.hash(password, 12);

    // 4) Crear usuario
    await prisma.user.create({
      data: {
        userName,
        email,
        password: hash,
        // isDonor: false (por defecto de tu schema)
      }
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
