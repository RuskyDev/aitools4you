import React from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { supabase } from "@/utils/supabase/client";
import { ArrowLeft } from "lucide-react";
import * as blogComponents from "../components";
import Link from "next/link";
import siteConfig from "@/config/site.config";

export async function generateMetadata({ params: maybeParams }) {
  const params = await maybeParams;
  const { slug } = params;
  const filePath = `posts/${slug}.mdx`;
  const { data } = await supabase.storage.from("Blogs").download(filePath);
  if (!data) return { title: "Blog Not Found" };

  const text = await data.text();
  const { frontmatter } = await compileMDX({
    source: text,
    options: { parseFrontmatter: true },
  });

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  let image = frontmatter.image || "/default-image.png";

  if (!image.startsWith("http")) {
    image = `${baseUrl}/storage/v1/object/public/Blogs/images/${slug}/${image}`;
  }

  const {
    title = "Default Blog Title",
    description = "Default blog description",
    keywords = [],
    author = "Default Author",
    publishedAt,
    updatedAt,
  } = frontmatter;

  return {
    title,
    description,
    keywords: Array.isArray(keywords) ? keywords.join(", ") : keywords,
    authors: [{ name: author }],
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://${siteConfig.domain}/blog/${slug}`,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      publishedTime: publishedAt,
      modifiedTime: updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogPage({ params: maybeParams }) {
  const params = await maybeParams;
  const { slug } = params;
  const filePath = `posts/${slug}.mdx`;
  const { data, error } = await supabase.storage
    .from("Blogs")
    .download(filePath);
  if (error || !data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Blog not found.</p>
      </div>
    );

  const text = await data.text();
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const { content, frontmatter } = await compileMDX({
    source: text,
    components: {
      ...blogComponents,
      Link,
      BlogImage: (props) => {
        let src = props.src;
        if (!src.startsWith("http"))
          src = `${baseUrl}/storage/v1/object/public/Blogs/images/${slug}/${src}`;
        return <blogComponents.BlogImage {...props} src={src} />;
      },
      BlogHeader: () => <blogComponents.BlogHeader {...frontmatter} />,
      AuthorCard: () => (
        <blogComponents.AuthorCard
          name={frontmatter.author}
          role={frontmatter.role || "Author"}
        />
      ),
    },
    options: { parseFrontmatter: true },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.image,
    author: { "@type": "Person", name: frontmatter.author },
    publisher: {
      "@type": "Organization",
      name: "AI Tools 4 You",
      logo: {
        "@type": "ImageObject",
        url: "https://aitools4you.ai/logo.png",
      },
    },
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.updatedAt || frontmatter.publishedAt,
  };

  return (
    <div className="min-h-screen bg-background px-6 py-8 max-w-4xl mx-auto">
      <Link href="/blog">
        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft size={20} />
          <span>Back to Blogs</span>
        </button>
      </Link>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {content}
    </div>
  );
}
