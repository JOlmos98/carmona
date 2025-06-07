import type { Metadata } from "next";
import { Jersey_10 } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const jersey_10 = Jersey_10({
  weight: '400',
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CARMONA",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jersey_10.className} antialiased`} >
        {children}
      </body>
    </html>
  );
}
