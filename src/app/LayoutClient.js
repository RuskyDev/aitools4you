"use client";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Script from "next/script";
import { useState, useEffect } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import siteConfig from "@/config/site.config";
import { FaCircleExclamation } from "react-icons/fa6";

const VerticalAdComponent = dynamic(
  () => import("@/components/VerticalAdComponent"),
  { ssr: false, loading: () => null }
);

const ADS = [
  {
    position: "left",
    src: "https://qmxubuxchxlzzzhxvvcc.supabase.co/storage/v1/object/public/Ad%20Banner%20Designs/Python-in-Action-Project-Based-Programming-Left-And-Right-Side-Ad-15-10-2025-_1_.webm",
    redirectTo:
      "https://www.amazon.com/Python-Action-Project-Based-Introduction-Applications/dp/B0DJJQR814",
  },
  {
    position: "right",
    src: "https://qmxubuxchxlzzzhxvvcc.supabase.co/storage/v1/object/public/Ad%20Banner%20Designs/Python-in-Action-Project-Based-Programming-Left-And-Right-Side-Ad-15-10-2025-_1_.webm",
    redirectTo:
      "https://www.amazon.com/Python-Action-Project-Based-Introduction-Applications/dp/B0DJJQR814",
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
  const [showPopup, setShowPopup] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [buttonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("popup_shown");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setShowPopup(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
      setCountdown(5);
      setButtonEnabled(false);
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setButtonEnabled(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      document.body.style.overflow = "";
    }
  }, [showPopup]);

  const closePopup = () => {
    localStorage.setItem("popup_shown", "true");
    setShowPopup(false);
  };

  return (
    <>
      {isProd && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');`}
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
        {ADS.map((ad) => (
          <VerticalAdComponent key={ad.position} {...ad} />
        ))}
        {children}
      </main>
      <Footer />
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
          aria-describedby="popup-description"
        >
          <div className="bg-card text-card-foreground rounded-lg shadow-lg border border-border w-full max-w-sm sm:max-w-md md:max-w-lg text-center p-6 animate-in fade-in-50 zoom-in-95">
            <FaCircleExclamation
              className="mx-auto mb-3 text-primary text-4xl"
              aria-hidden="true"
            />
            <h2
              id="popup-title"
              className="text-lg font-semibold mb-3 text-primary"
            >
              IMPORTANT MESSAGE, PLEASE READ!
            </h2>
            <p id="popup-description" className="text-sm text-muted-foreground">
              You might notice there aren’t many tools or features yet, but
              don’t leave just yet. Bookmark this site and check back later as
              we’re adding new tools and features every day.
            </p>
            <button
              onClick={closePopup}
              disabled={!buttonEnabled}
              aria-label={
                buttonEnabled ? "Got it" : `Got it in ${countdown} seconds`
              }
              className={`mt-5 w-full rounded-md py-2 font-medium transition-all duration-300 ease-out ${
                buttonEnabled
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.03] hover:shadow-lg active:scale-[0.98]"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {buttonEnabled ? "Got it" : `Got It (${countdown})`}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
