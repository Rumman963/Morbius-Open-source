import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "../styles.css";
import "../brand.css";

export const metadata: Metadata = {
  title: "Morbius — Make it yours",
  description: "A visual library of components, blocks, and pages to make your own.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" data-theme-choice="light" data-wallpaper="blood-moon" data-scroll-behavior="smooth">
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=britney@400&f[]=general-sans@400,500,600,700&f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
