export const metadata = {
  title:
    "Discover the Best AI Tools to Simplify Your Daily Tasks and Save Time",
  description:
    "Explore the top AI tools designed to boost productivity, automate tasks, and make everyday life easier. Learn how ChatGPT, Grammarly, Notion AI, and more can save you time and enhance your workflow.",
  alternates: {
    canonical:
      "https://aitools4you.ai/blog/discover-the-best-ai-tools-to-simplify-your-daily-tasks-and-save-time",
  },
  openGraph: {
    type: "article",
    url: "https://aitools4you.ai/blog/discover-the-best-ai-tools-to-simplify-your-daily-tasks-and-save-time",
    title:
      "Discover the Best AI Tools to Simplify Your Daily Tasks and Save Time",
    description:
      "Explore the best AI tools that boost productivity, automate tasks, and simplify your everyday life. Learn about ChatGPT, Grammarly, Notion AI, and more.",
    siteName: "AI Tools 4 You",
    images: [
      {
        url: "https://aitools4you.ai/blogs/discover-the-best-ai-tools-to-simplify-your-daily-tasks-and-save-time/Discover-the-Best-AI-Tools-to-Simplify-Your-Daily-Tasks-and-Save-Time.webp",
        width: 1200,
        height: 630,
        alt: "AI tools that simplify daily tasks and save time",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Discover the Best AI Tools to Simplify Your Daily Tasks and Save Time",
    description:
      "Boost productivity with top AI tools like ChatGPT, Grammarly, and Notion AI. Simplify tasks and save time with smart automation.",
    images: [
      "https://aitools4you.ai/blogs/discover-the-best-ai-tools-to-simplify-your-daily-tasks-and-save-time/Discover-the-Best-AI-Tools-to-Simplify-Your-Daily-Tasks-and-Save-Time.webp",
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
        "https://aitools4you.ai/blog/discover-the-best-ai-tools-to-simplify-your-daily-tasks-and-save-time",
    },
    headline:
      "Discover the Best AI Tools to Simplify Your Daily Tasks and Save Time",
    description:
      "Explore the best AI tools that boost productivity, automate tasks, and simplify your everyday life. Learn about ChatGPT, Grammarly, Notion AI, and more.",
    image:
      "https://aitools4you.ai/blogs/discover-the-best-ai-tools-to-simplify-your-daily-tasks-and-save-time/Discover-the-Best-AI-Tools-to-Simplify-Your-Daily-Tasks-and-Save-Time.webp",
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
