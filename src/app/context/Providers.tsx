'use client';

import { SettingsProvider } from '@/components/components';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
// import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
      scriptProps={{ async: true, defer: true }}
    >
      <SettingsProvider>
        {/* <SessionProvider> */}
        {children}
        {/* </SessionProvider> */}
      </SettingsProvider>
    </GoogleReCaptchaProvider>
  );
}
