import "@/styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import siteConfig from "@/config/site.config";
import RootLayoutClient from "./layoutClient";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: siteConfig.name || "Website",
  description: siteConfig.description || "Discover top AI tools for developers, designers, and creators.",
  icons: { icon: "/favicon.ico" },
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
