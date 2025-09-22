import type { NextRequest } from 'next/server';

const supportedLocales = ['en', 'es', 'de'];
const defaultLocale = 'en';

export function detectLocale(request: NextRequest | Request): string {
  // Puede ser NextRequest (middleware) o Request (API Route)

  const cookiesObj = 'cookies' in request ? request.cookies : undefined;
  let localeCookie: string | undefined;

  if (cookiesObj) {
    localeCookie = cookiesObj.get('NEXT_LOCALE')?.value;
  } else {
    const cookieHeader = (request.headers.get("cookie") ?? "");
    const match = cookieHeader.match(/NEXT_LOCALE=([^;]+)/);
    localeCookie = match ? match[1] : undefined;
  }

  if (localeCookie && supportedLocales.includes(localeCookie)) {
    return localeCookie;
  }

  const acceptLanguage = request.headers.get('accept-language') || defaultLocale;
  const preferredLanguage = acceptLanguage.split(',')[0].split('-')[0];

  if (supportedLocales.includes(preferredLanguage)) {
    return preferredLanguage;
  }

  return defaultLocale;
}
