"use client";
import dynamic from "next/dynamic";
import Script from "next/script";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import siteConfig from "@/config/site.config";

const VerticalAdComponent = dynamic(() => import("@/components/VerticalAdComponent"), {
  ssr: false,
  loading: () => null,
});

const GA_ID = "G-LB76TE1F7S";

export default function RootLayoutClient({ children }) {
  const isProd = process.env.NODE_ENV === "production";

  return (
    <>
      {isProd && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}
      <Navbar navItems={siteConfig.navigationBarItems} />
      <main className="relative min-h-screen pb-[120px]">
        <VerticalAdComponent position="left" src="https://qmxubuxchxlzzzhxvvcc.supabase.co/storage/v1/object/public/Ad%20Banner%20Designs/Python%20in%20Action%20Project-Based%20Programming%20-%20Left%20And%20Right%20Side%20Ad-15-10-2025.gif" redirectTo={"https://www.amazon.com/Python-Action-Project-Based-Introduction-Applications/dp/B0DJJQR814"} />
        <VerticalAdComponent position="right" src="https://qmxubuxchxlzzzhxvvcc.supabase.co/storage/v1/object/public/Ad%20Banner%20Designs/Python%20in%20Action%20Project-Based%20Programming%20-%20Left%20And%20Right%20Side%20Ad-15-10-2025.gif" redirectTo={"https://www.amazon.com/Python-Action-Project-Based-Introduction-Applications/dp/B0DJJQR814"}/>
        {children}
      </main>
      <Footer />
    </>
  );
}
