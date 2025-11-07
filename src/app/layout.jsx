import "@/styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import RootLayoutClient from "./LayoutClient";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Tools 4 You",
  description:
    "Discover top AI tools for developers, designers, and creators to boost productivity, automate tasks, and enhance creativity effortlessly.",
  keywords: ["ai tools", "new ai tools", "list of ai tools", "top ai tools"],
  authors: [{ name: "AI Tools 4 You" }],
  creator: "AI Tools 4 Yous",
  publisher: "AI Tools 4 You",
  metadataBase: new URL("https://aitools4you.ai"),
  alternates: { canonical: "https://aitools4you.ai" },
  openGraph: {
    type: "website",
    url: "https://aitools4you.ai",
    title: "AI Tools 4 You",
    description:
      "Discover top AI tools for developers, designers, and creators to boost productivity, automate tasks, and enhance creativity effortlessly.",
    images: ["/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools 4 You",
    description:
      "Discover top AI tools for developers, designers, and creators to boost productivity, automate tasks, and enhance creativity effortlessly.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
      { rel: "manifest", url: "/web-app-manifest-192x192.png" },
      { rel: "manifest", url: "/web-app-manifest-512x512.png" },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
