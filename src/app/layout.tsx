"use client";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isHomePage = window.location.pathname === '/';
    
    if (!isHomePage) {
      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 1 });
      }
      if (navbarRef.current) {
        gsap.set(navbarRef.current, { opacity: 1 });
      }
    }
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header ref={headerRef} />
        <Navbar ref={navbarRef} />
        {children}
      </body>
    </html>
  );
}