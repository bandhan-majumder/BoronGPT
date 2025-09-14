import type React from "react";
import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Providers } from "../providers";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Boron - Build in seconds",
  description:
    "Experience the next generation of building experience with BoronGPT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${orbitron.variable} ${geistMono.variable}`}>
        <Suspense fallback={null}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
