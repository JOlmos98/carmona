
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { detectLocale } from './lib/detectLocale';
import { getToken } from 'next-auth/jwt';

const supportedLocales = ['en', 'es', 'de'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;                                               // Extrae la ruta actual de la URL

  const segments = pathname.split('/');                                               // Divide la ruta en segmentos por "/"
  const localeInPath = supportedLocales.includes(segments[1]) ? segments[1] : null;   // Detecta si el segundo segmento es un idioma soportado

  const pathWithoutLocale = localeInPath                                              // Elimina el idioma de la ruta si existe
    ? '/' + segments.slice(2).join('/') 
    : pathname;

  const protectedPaths = ['/dashboard', '/profile', '/settings'];                     // Rutas que requieren autenticación

  const isProtectedPath = protectedPaths.some(path => pathWithoutLocale.startsWith(path)); // Comprueba si la ruta es protegida

  if (isProtectedPath) {                                                              // Si es una ruta protegida
    const token = await getToken({ req: request });                                   // Intenta obtener el token de sesión
    const isAuthenticated = !!token;                                                  // Determina si el usuario está autenticado

    if (!isAuthenticated) {                                                           // Si no está autenticado
      const locale = localeInPath || detectLocale(request);                           // Usa el idioma de la URL o lo detecta
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));         // Redirige al login con el idioma correspondiente
    }
  }

  if (supportedLocales.some(locale => pathname.startsWith(`/${locale}`))) return createMiddleware(routing)(request);// Si la ruta ya tiene idioma delega en next-intl para manejar el enrutamiento

  const preferredLanguage = detectLocale(request);                                    // Detecta el idioma preferido del usuario

  const response = NextResponse.redirect(new URL(`/${preferredLanguage}${pathname}`, request.url)); // Redirige agregando el idioma a la ruta
  response.cookies.set('NEXT_LOCALE', preferredLanguage, { path: '/' });              // Guarda el idioma en una cookie

  return response;
}


export const config = {
  matcher: [
    '/',
    '/(de|en|es)/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/login',
  ],
};
