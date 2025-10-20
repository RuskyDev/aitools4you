import "@/styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import siteConfig from "@/config/site.config";
import RootLayoutClient from "./LayoutClient";
import Script from "next/script";
import { usePathname } from "next/navigation";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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

export const metadata = {
  title: "Ai Tools 4 You",
  description: siteConfig.description,
  keywords: [
    "ai tool",
    "new ai tool",
    "list of ai tools",
  ],
  authors: [{ name: "Ai Tools 4 You" }],
  creator: "Ai Tools 4 You",
  publisher: "Ai Tools 4 You",
  metadataBase: new URL("https://aitools4you.ai"),
  alternates: {
    canonical: "https://aitools4you.ai",
  },
  openGraph: {
    type: "website",
    url: "https://aitools4you.ai",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const breadcrumbs = breadcrumbMap[pathname] || breadcrumbMap["/"];

  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
        <Script
          type="application/ld+json"
          id="structured-data"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "name": "Ai Tools 4 You",
                  "url": "https://aitools4you.ai",
                  "logo": "https://aitools4you.ai/logo.png",
                  "sameAs": [
                    "https://www.linkedin.com/company/ai-tools-4-you",
                    "https://instagram.com/aitools4you.official",
                    "https://www.facebook.com/aitools4you",
                    "https://x.com/aitools4youai",
                    "https://reddit.com/r/aitools4you",
                    "https://discord.gg/5wyRWYByFU"
                  ]
                },
                {
                  "@type": "BreadcrumbList",
                  "itemListElement": breadcrumbs.map((crumb, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: crumb.name,
                    item: crumb.url,
                  })),
                }
              ]
            })
          }}
        />
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
