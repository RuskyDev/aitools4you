"use client"
import dynamic from "next/dynamic"
import Script from "next/script"
import Navbar from "@/components/ui/Navbar"
import Footer from "@/components/ui/Footer"
import siteConfig from "@/config/site.config"

const VerticalAdComponent = dynamic(() => import("@/components/VerticalAdComponent"), {
  ssr: false,
  loading: () => null,
})

const ADS = [
  {
    position: "left",
    src: "https://qmxubuxchxlzzzhxvvcc.supabase.co/storage/v1/object/public/Ad%20Banner%20Designs/Python%20in%20Action%20Project-Based%20Programming%20-%20Left%20And%20Right%20Side%20Ad-15-10-2025.gif",
    redirectTo: "https://www.amazon.com/Python-Action-Project-Based-Introduction-Applications/dp/B0DJJQR814",
  },
  {
    position: "right",
    src: "https://qmxubuxchxlzzzhxvvcc.supabase.co/storage/v1/object/public/Ad%20Banner%20Designs/Python%20in%20Action%20Project-Based%20Programming%20-%20Left%20And%20Right%20Side%20Ad-15-10-2025.gif",
    redirectTo: "https://www.amazon.com/Python-Action-Project-Based-Introduction-Applications/dp/B0DJJQR814",
  },
]

export default function RootLayoutClient({ children }) {
  const isProd = process.env.NODE_ENV === "production"

  return (
    <>
      {isProd && process.env.GOOGLE_ANALYTICS_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');`}
          </Script>
        </>
      )}
      <Navbar navItems={siteConfig.navigationBarItems} />
      <main className="relative min-h-screen pb-[120px]">
        {ADS.map(ad => (
          <VerticalAdComponent key={ad.position} {...ad} />
        ))}
        {children}
      </main>
      <Footer />
    </>
  )
}
