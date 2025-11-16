import { Inter, Inria_Serif, Kaisei_Tokumin } from "next/font/google";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import type { Metadata } from "next";

import "../globals.css";

// Base font - Inter
const inter = Inter({
  variable: "--font-family-base",
  subsets: ["latin"],
  display: "swap",
});

// Hero font - Inria Serif
const inriaSerif = Inria_Serif({
  variable: "--font-family-hero",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

// Header font - Kaisei Tokumin
const kaiseiTokumin = Kaisei_Tokumin({
  variable: "--font-family-header",
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IronGirl",
  description: "Welcome to IronGirl",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactElement> {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${inriaSerif.variable} ${kaiseiTokumin.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
