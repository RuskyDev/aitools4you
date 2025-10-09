"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import siteConfig from "@/config/site.config";
import { usePathname } from "next/navigation";
import VerticalAdComponent from "@/components/VerticalAdComponent";

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
        <div className="relative min-h-screen pb-[120px]">
          <VerticalAdComponent position="left" src="/ads/left.jpg" />
          <VerticalAdComponent position="right" src="/ads/right.jpg" />
          {children}
        </div>
        {!hideNavbarAndFooter && <Footer />}
      </body>
    </html>
  );
}
