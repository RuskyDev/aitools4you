"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import siteConfig from "@/config/site.config";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideNavbarAndFooter = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
        suppressHydrationWarning
      >
        {!hideNavbarAndFooter && <Navbar navItems={siteConfig.navItems} />}
        {children}
        {!hideNavbarAndFooter && <Footer />}
      </body>
    </html>
  );
}
