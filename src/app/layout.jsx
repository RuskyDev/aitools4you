import "@/styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import siteConfig from "@/config/site.config";
import RootLayoutClient from "./layoutClient";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Ai Tools 4 You",
  description: siteConfig.description,
  keywords: [
    "AI tools",
    "artificial intelligence",
    "machine learning",
    "automation",
    "developers",
    "designers",
    "creators",
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
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
