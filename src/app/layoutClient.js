"use client";
import Script from "next/script";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import siteConfig from "@/config/site.config";

const GA_ID = "G-LB76TE1F7S";

export default function RootLayoutClient({ children }) {
  const isProd = process.env.NODE_ENV !== "development";

  return (
    <>
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
          {/* <VerticalAdComponent position="left" src="null" />
          <VerticalAdComponent position="right" src="null" /> */}
        {children}
      </main>
      <Footer />
    </>
  );
}
