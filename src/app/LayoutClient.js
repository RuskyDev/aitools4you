"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Script from "next/script";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import siteConfig from "@/config/site.config";
import { FaCircleExclamation } from "react-icons/fa6";

const VerticalAdComponent = dynamic(
  () => import("@/components/VerticalAdComponent"),
  { ssr: false }
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

function AnalyticsScript() {
  const id = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  if (!id || process.env.NODE_ENV !== "production") return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config','${id}');`}
      </Script>
    </>
  );
}

function GTMScript() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  if (!gtmId || process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script id="gtm-head" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}

function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Tools 4 You",
    url: "https://www.aitools4you.ai",
    logo: "https://www.aitools4you.ai/logo.png",
    sameAs: [
      "https://www.linkedin.com/company/ai-tools-4-you",
      "https://instagram.com/aitools4you.official",
      "https://www.facebook.com/aitools4you",
      "https://x.com/aitools4youai",
      "https://reddit.com/r/aitools4you",
      "https://discord.gg/5wyRWYByFU",
      "https://www.youtube.com/@aitools4youofficial"
    ]
  };

  const breadcrumbSchema = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "AI Tools 4 You | Home",
        item: "https://aitools4you.ai/"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Tools 4 You | About",
        item: "https://aitools4you.ai/about-us"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "AI Tools 4 You | Blog",
        item: "https://aitools4you.ai/blog"
      }
    ]
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

function Popup({ onClose }) {
  const [countdown, setCountdown] = useState(5);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setEnabled(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-card text-card-foreground rounded-lg shadow-lg border border-border w-full max-w-sm sm:max-w-md md:max-w-lg text-center p-6 animate-in fade-in-50 zoom-in-95">
        <FaCircleExclamation className="mx-auto mb-3 text-primary text-4xl" />
        <h2 className="text-lg font-semibold mb-3 text-primary">
          IMPORTANT MESSAGE, PLEASE READ!
        </h2>
        <p className="text-sm text-muted-foreground">
          You might notice there aren’t many tools or features yet. Bookmark
          this site and check back later as we’re adding new tools every day.
        </p>
        <button
          onClick={onClose}
          disabled={!enabled}
          className={`mt-5 w-full rounded-md py-2 font-medium transition-all ${
            enabled
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.03] hover:shadow-lg active:scale-[0.98]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {enabled ? "Got it" : `Got It (${countdown})`}
        </button>
      </div>
    </div>
  );
}

export default function RootLayoutClient({ children }) {
  const pathname = usePathname();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("popup_shown")) {
      const timer = setTimeout(() => setShowPopup(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem("popup_shown", "true");
    setShowPopup(false);
  };

  return (
    <>
      <GTMScript />
      <AnalyticsScript />
      <Navbar navItems={siteConfig.navigationBarItems} />
      <StructuredData />
      <main>
        {ADS.map((ad) => (
          <VerticalAdComponent key={ad.position} {...ad} />
        ))}
        {children}
      </main>
      <Footer />
      {showPopup && <Popup onClose={handleClose} />}
    </>
  );
}
