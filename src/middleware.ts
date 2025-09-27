
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


//SUGERENCIA DE LA IA:

// /middleware.ts

// import createMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { detectLocale } from './lib/detectLocale';
// import { auth } from "@/auth"; // <-- ¡CAMBIO 1: Importa `auth`!

// const supportedLocales = ['en', 'es', 'de'];
// const protectedPaths = ['/dashboard', '/profile', '/settings'];

// // El middleware de i18n que se ejecutará al final
// const intlMiddleware = createMiddleware(routing);

// export default auth((request) => { // <-- ¡CAMBIO 2: Envuelve todo en `auth`!
//   const { pathname } = request.nextUrl;

//   const segments = pathname.split('/');
//   const localeInPath = supportedLocales.includes(segments[1]) ? segments[1] : null;

//   const pathWithoutLocale = localeInPath
//     ? '/' + segments.slice(2).join('/')
//     : pathname;

//   const isProtectedPath = protectedPaths.some(path => pathWithoutLocale.startsWith(path));

//   // La nueva forma de comprobar la autenticación con el helper `auth`
//   const isAuthenticated = !!request.auth?.user;

//   if (isProtectedPath && !isAuthenticated) {
//     const locale = localeInPath || detectLocale(request);
//     // request.url ya está disponible en el objeto `request`
//     return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
//   }

//   // Si no es una ruta protegida o el usuario está autenticado,
//   // deja que el middleware de next-intl haga su trabajo.
//   return intlMiddleware(request);
// });


// export const config = {
//   // El matcher necesita excluir las rutas internas de Next.js y los assets estáticos
//   // para que el middleware no interfiera con ellos.
//   matcher: [
//     // Habilita un prefijo opcional para los locales
//     '/',
//     '/(de|en|es)/:path*',

//     // Evita que el matcher se ejecute en rutas que no deberían ser procesadas
//     // como las de la API o los archivos estáticos.
//     '/((?!api|_next/static|_next/image|favicon.ico).*)'
//   ],
// };