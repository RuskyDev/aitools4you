import { supabase } from "@/utils/supabase/client";
import { compileMDX } from "next-mdx-remote/rsc";

export async function GET(req) {
  const { search } = Object.fromEntries(new URL(req.url).searchParams);
  const query = search?.toLowerCase() || "";

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  try {
    const { data: files, error } = await supabase.storage
      .from("Blogs")
      .list("posts", { limit: 100 });

    if (error) throw error;

    const blogList = await Promise.all(
      files
        .filter((f) => f.name.endsWith(".mdx"))
        .map(async (file) => {
          const slug = file.name.replace(".mdx", "");
          const filePath = `posts/${file.name}`;
          const { data } = await supabase.storage.from("Blogs").download(filePath);
          if (!data) return null;

          const text = await data.text();
          const { frontmatter } = await compileMDX({
            source: text,
            options: { parseFrontmatter: true },
          });

          return {
            id: slug,
            title: frontmatter.title,
            author: frontmatter.author,
            date: frontmatter.date,
            readTime: frontmatter.readTime,
            coverImage: frontmatter.image?.startsWith("http")
              ? frontmatter.image
              : `${baseUrl}/storage/v1/object/public/Blogs/images/${slug}/${frontmatter.image || "default-image.png"}`,
            link: `/blog/${slug}`,
          };
        })
    );

    const filtered = blogList
      .filter(Boolean)
      .filter((blog) => blog.title.toLowerCase().includes(query))
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return new Response(JSON.stringify(filtered), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
