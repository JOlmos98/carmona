import type { Metadata } from "next";
import { Jersey_10 } from "next/font/google";
import "./../globals.css"
import { Providers } from "../context/Providers";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";

const jersey_10 = Jersey_10({
  weight: '400',
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CARMONA",
  description: "",
};

export const locales = ["es", "en", "de"];

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {

  const { locale } = await params;
  if (!routing.locales.includes(locale as "en" | "de" | "es")) {
    notFound();
  }

  const messages = await getMessages();
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${jersey_10.className} antialiased`} >
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
