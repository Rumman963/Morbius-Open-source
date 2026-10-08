import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import "../styles.css";
import "../brand.css";

export const metadata: Metadata = {
  title: "Morbius — Make it yours",
  description: "A visual library of components, blocks, and pages to make your own.",
};

const themeInitScript = `(()=>{try{const saved=localStorage.getItem("morbius-theme");const choice=saved==="light"||saved==="dark"?saved:"system";const dark=choice==="dark"||(choice==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.dataset.themeChoice=choice;document.documentElement.dataset.theme=dark?"dark":"light"}catch{}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} data-theme="light" data-theme-choice="system" data-wallpaper="blood-moon" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link
          href="https://api.fontshare.com/v2/css?f[]=britney@400&f[]=nosifer@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
