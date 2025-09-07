import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Actor } from "next/font/google";
import "./globals.css";
import { Providers } from "../providers";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
// });

const actor = Actor({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "BoronGPT",
  description:
    "A gpt wrapper that lets you build, edit and preview MVPs inside browser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={actor.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
