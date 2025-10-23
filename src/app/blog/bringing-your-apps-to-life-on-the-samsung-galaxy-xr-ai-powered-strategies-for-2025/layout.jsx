export const metadata = {
  title:
    "Bringing Your Apps to Life on the Samsung Galaxy XR – AI-Powered Strategies for 2025",
  description:
    "Learn how to adapt your apps for the new Samsung Galaxy XR built on Android XR. Explore AI-powered strategies, spatial computing, and developer tools to create immersive experiences for 2025 and beyond.",
  alternates: {
    canonical:
      "https://aitools4you.ai/blog/bringing-your-apps-to-life-on-the-samsung-galaxy-xr-ai-powered-strategies-for-2025",
  },
  openGraph: {
    type: "article",
    url: "https://aitools4you.ai/blog/bringing-your-apps-to-life-on-the-samsung-galaxy-xr-ai-powered-strategies-for-2025",
    title:
      "Bringing Your Apps to Life on the Samsung Galaxy XR – AI-Powered Strategies for 2025",
    description:
      "Discover how to build immersive apps for the Samsung Galaxy XR using AI-driven tools, XR design strategies, and Android XR integration best practices.",
    siteName: "AI Tools 4 You",
    images: [
      {
        url: "https://aitools4you.ai/blogs/bringing-your-apps-to-life-on-the-samsung-galaxy-xr-ai-powered-strategies-for-2025/Bringing-Your-Apps-to-Life-on-the-Samsung-Galaxy-XR.webp",
        width: 1200,
        height: 630,
        alt: "Samsung Galaxy XR AI-powered app development strategies for 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Bringing Your Apps to Life on the Samsung Galaxy XR – AI-Powered Strategies for 2025",
    description:
      "Explore AI-powered development strategies for the Samsung Galaxy XR and learn how to bring your apps into immersive 3D environments.",
    images: [
      "https://aitools4you.ai/blogs/bringing-your-apps-to-life-on-the-samsung-galaxy-xr-ai-powered-strategies-for-2025/Bringing-Your-Apps-to-Life-on-the-Samsung-Galaxy-XR.webp",
    ],
  },
};

export default function Layout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id":
        "https://aitools4you.ai/blog/bringing-your-apps-to-life-on-the-samsung-galaxy-xr-ai-powered-strategies-for-2025",
    },
    headline:
      "Bringing Your Apps to Life on the Samsung Galaxy XR – AI-Powered Strategies for 2025",
    description:
      "Learn how to adapt your apps for the new Samsung Galaxy XR built on Android XR. Explore AI-powered strategies, spatial computing, and developer tools to create immersive experiences for 2025 and beyond.",
    image:
      "https://aitools4you.ai/blogs/bringing-your-apps-to-life-on-the-samsung-galaxy-xr-ai-powered-strategies-for-2025/Bringing-Your-Apps-to-Life-on-the-Samsung-Galaxy-XR.webp",
    author: {
      "@type": "Person",
      name: "Kathrine Narducci",
    },
    publisher: {
      "@type": "Organization",
      name: "AI Tools 4 You",
      logo: {
        "@type": "ImageObject",
        url: "https://aitools4you.ai/logo.png",
      },
    },
    datePublished: "2025-10-23",
    dateModified: "2025-10-23",
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </main>
  );
}
