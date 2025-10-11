import type { Metadata } from 'next';
import { Jersey_10 } from 'next/font/google';
import '@/app/globals.css';
import { Providers } from '../context/Providers';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { ShowSettings } from '@/components/components/Settings/ShowSettings';
import { auth } from '@/backend/auth';
import { SessionProvider } from 'next-auth/react';

const jersey_10 = Jersey_10({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = { title: 'CARMONA', description: '' };

export const locales = ['es', 'en', 'de'];

export default async function RootLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'en' | 'de' | 'es')) {
    notFound();
  }

  const messages = await getMessages();
  const session = await auth();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
    >
      <body
        className={`${jersey_10.className} antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <SessionProvider session={session}>
            <Providers>
              {children}
              <ShowSettings />
            </Providers>
          </SessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
