export const metadata = {
  title: "ChatGPT Atlas Review: The Future of Browsing Starts Here",
  description:
    "Discover ChatGPT Atlas — OpenAI’s revolutionary AI-powered browser that transforms the way you search and explore the web. Learn how it compares to Chrome, integrates with AI tools, and what the future holds for browsing.",
  alternates: {
    canonical:
      "https://aitools4you.ai/blog/chatgpt-atlas-review-the-future-of-browsing-starts-here",
  },
  openGraph: {
    type: "article",
    url: "https://aitools4you.ai/blog/chatgpt-atlas-review-the-future-of-browsing-starts-here",
    title: "ChatGPT Atlas Review: The Future of Browsing Starts Here",
    description:
      "Explore how ChatGPT Atlas, OpenAI’s AI-powered browser, redefines online browsing with conversational search, context awareness, and deep AI integration.",
    siteName: "AI Tools 4 You",
    images: [
      {
        url: "https://aitools4you.ai/blogs/chatgpt-atlas-review-the-future-of-browsing-starts-here/ChatGPT-Atlas-Review-The-Future-of-Browsing-Starts-Here.webp",
        width: 1200,
        height: 630,
        alt: "ChatGPT Atlas browser review and AI-powered browsing interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatGPT Atlas Review: The Future of Browsing Starts Here",
    description:
      "A complete review of ChatGPT Atlas — the AI browser by OpenAI that changes how we search, read, and interact online.",
    images: [
      "https://aitools4you.ai/blogs/chatgpt-atlas-review-the-future-of-browsing-starts-here/ChatGPT-Atlas-Review-The-Future-of-Browsing-Starts-Here.webp",
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
        "https://aitools4you.ai/blog/chatgpt-atlas-review-the-future-of-browsing-starts-here",
    },
    headline: "ChatGPT Atlas Review: The Future of Browsing Starts Here",
    description:
      "Discover ChatGPT Atlas — OpenAI’s revolutionary AI-powered browser that transforms the way you search and explore the web. Learn how it compares to Chrome, integrates with AI tools, and what the future holds for browsing.",
    image:
      "https://aitools4you.ai/blogs/chatgpt-atlas-review-the-future-of-browsing-starts-here/ChatGPT-Atlas-Review-The-Future-of-Browsing-Starts-Here.webp",
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
