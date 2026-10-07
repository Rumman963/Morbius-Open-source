import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "../styles.css";
import "../brand.css";

export const metadata: Metadata = {
  title: "Morbius — Interfaces after dark",
  description:
    "A living library of interface components, full-page blocks, and tools to shape them your way.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-wallpaper="blood-moon" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&family=Nosifer&family=Unbounded:wght@500;600;700;800&family=UnifrakturMaguntia&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
