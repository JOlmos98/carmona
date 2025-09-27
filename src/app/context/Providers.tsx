'use client'

import { SettingsProvider } from '@/components/components'
// import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
    
    return (
        <SettingsProvider>
            {/* <SessionProvider> */}
                {children}
            {/* </SessionProvider> */}
        </SettingsProvider>
    )
}