"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import "@/styles/globals.css";

import siteConfig from "@/config/site.config";

import Footer from "@/components/ui/Footer";
import Navbar from "@/components/ui/Navbar";
import VerticalAdComponent from "@/components/VerticalAdComponent";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const GA_ID = "G-LB76TE1F7S";

export default function RootLayout({ children }) {
  const isProd = process.env.NODE_ENV !== "development";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
        suppressHydrationWarning
      >
        {isProd && (
          <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <Script id="google-analytics">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}

        <Navbar navItems={siteConfig.navItems} />

        <main className="relative min-h-screen pb-[120px]">
          {/* <VerticalAdComponent position="left" src="/ads/left.jpg" />
          <VerticalAdComponent position="right" src="/ads/right.jpg" /> */}
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
