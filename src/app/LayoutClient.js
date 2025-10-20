"use client";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Script from "next/script";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import siteConfig from "@/config/site.config";

const VerticalAdComponent = dynamic(() => import("@/components/VerticalAdComponent"), {
  ssr: false,
  loading: () => null,
});

const ADS = [
  {
    position: "left",
    src: "https://qmxubuxchxlzzzhxvvcc.supabase.co/storage/v1/object/public/Ad%20Banner%20Designs/Python-in-Action-Project-Based-Programming-Left-And-Right-Side-Ad-15-10-2025-_1_.webm",
    redirectTo: "https://www.amazon.com/Python-Action-Project-Based-Introduction-Applications/dp/B0DJJQR814",
  },
  {
    position: "right",
    src: "https://qmxubuxchxlzzzhxvvcc.supabase.co/storage/v1/object/public/Ad%20Banner%20Designs/Python-in-Action-Project-Based-Programming-Left-And-Right-Side-Ad-15-10-2025-_1_.webm",
    redirectTo: "https://www.amazon.com/Python-Action-Project-Based-Introduction-Applications/dp/B0DJJQR814",
  },
];

const breadcrumbMap = {
  "/": [{ name: "Home", url: "https://www.aitools4you.ai/" }],
  "/blog": [
    { name: "Home", url: "https://www.aitools4you.ai/" },
    { name: "Blog", url: "https://www.aitools4you.ai/blog" },
  ],
  "/contact": [
    { name: "Home", url: "https://www.aitools4you.ai/" },
    { name: "Contact", url: "https://www.aitools4you.ai/contact" },
  ],
  "/ads": [
    { name: "Home", url: "https://www.aitools4you.ai/" },
    { name: "Ads", url: "https://www.aitools4you.ai/ads" },
  ],
  "/ads/buy": [
    { name: "Home", url: "https://www.aitools4you.ai/" },
    { name: "Ads", url: "https://www.aitools4you.ai/ads" },
    { name: "Buy Ads", url: "https://www.aitools4you.ai/ads/buy" },
  ],
  "/submit-tool": [
    { name: "Home", url: "https://www.aitools4you.ai/" },
    { name: "Submit Tool", url: "https://www.aitools4you.ai/submit-tool" },
  ],
  "/terms": [
    { name: "Home", url: "https://www.aitools4you.ai/" },
    { name: "Terms", url: "https://www.aitools4you.ai/terms" },
  ],
  "/privacy": [
    { name: "Home", url: "https://www.aitools4you.ai/" },
    { name: "Privacy", url: "https://www.aitools4you.ai/privacy" },
  ],
  "/about-us": [
    { name: "Home", url: "https://www.aitools4you.ai/" },
    { name: "About Us", url: "https://www.aitools4you.ai/about-us" },
  ],
};

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();
  const breadcrumbs = breadcrumbMap[pathname] || breadcrumbMap["/"];
  const isProd = process.env.NODE_ENV === "production";

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

      <Script
        type="application/ld+json"
        id="structured-data"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                name: "Ai Tools 4 You",
                url: "https://aitools4you.ai",
                logo: "https://aitools4you.ai/logo.png",
                sameAs: [
                  "https://www.linkedin.com/company/ai-tools-4-you",
                  "https://instagram.com/aitools4you.official",
                  "https://www.facebook.com/aitools4you",
                  "https://x.com/aitools4youai",
                  "https://reddit.com/r/aitools4you",
                  "https://discord.gg/5wyRWYByFU",
                ],
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: breadcrumbs.map((crumb, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: crumb.name,
                  item: crumb.url,
                })),
              },
            ],
          }),
        }}
      />

      <main className="relative min-h-screen pb-[120px]">
        {ADS.map(ad => (
          <VerticalAdComponent key={ad.position} {...ad} />
        ))}
        {children}
      </main>

      <Footer />
    </>
  );
}
