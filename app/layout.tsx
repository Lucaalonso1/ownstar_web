import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Marquee } from "@/components/Marquee";
import Preloader from "@/components/Preloader";

export const metadata: Metadata = {
  title: "OWNSTAR | Modern Streetwear",
  description: "Minimalist fashion for the modern generation.",
  icons: {
    icon: "/logo-ownstar.png",
    shortcut: "/logo-ownstar.png",
    apple: "/logo-ownstar.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <LanguageProvider>
          <CartProvider>
            <Preloader />
            <Marquee className="fixed top-0 left-0 w-full z-[100]" />
            <CartDrawer />
            {children}
            <Footer />
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
