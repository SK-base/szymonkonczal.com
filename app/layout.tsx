import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { NavBar } from "@/components/layout/NavBar";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { absoluteUrl, SITE_NAME, DEFAULT_OG_IMAGE_PATH, buildTwitter } from "@/lib/metadata";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Szymon Konczal",
    template: "%s | Szymon Konczal",
  },
  description: "Personal homepage, notes, articles, and projects",
  openGraph: {
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [{ url: absoluteUrl(DEFAULT_OG_IMAGE_PATH) }],
  },
  twitter: buildTwitter({
    title: SITE_NAME,
    description: "Personal homepage, notes, articles, and projects",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className="min-h-screen">
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <ThemeProvider>
          <NavBar />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
