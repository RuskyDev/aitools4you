import Image from "next/image";
import { Calendar, Clock, User, Search } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/utils/supabase/client";
import { compileMDX } from "next-mdx-remote/rsc";
import HorizontalAdComponent from "@/components/HorizontalAdComponent";

export const revalidate = 60;

export default async function Blogs({ searchParams: maybeSearchParams }) {
  const searchParams = await maybeSearchParams;
  const page = parseInt(searchParams?.page || "1", 10);

  const blogsPerPage = 9;
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  let blogs = [];

  try {
    const { data: files, error } = await supabase.storage
      .from("Blogs")
      .list("posts", { limit: 100 });

    if (error) throw error;
    if (!files?.length) return renderEmpty();

    const blogList = await Promise.all(
      files
        .filter((f) => f.name.endsWith(".mdx"))
        .map(async (file) => {
          const slug = file.name.replace(".mdx", "");
          const filePath = `posts/${file.name}`;
          const { data } = await supabase.storage
            .from("Blogs")
            .download(filePath);
          if (!data) return null;

          const text = await data.text();
          const { frontmatter } = await compileMDX({
            source: text,
            options: { parseFrontmatter: true },
          });

          let coverImage = frontmatter.image || "/default-image.png";
          if (!coverImage.startsWith("http")) {
            coverImage = `${baseUrl}/storage/v1/object/public/Blogs/images/${slug}/${coverImage}`;
          }

          return {
            id: slug,
            title: frontmatter.title,
            author: frontmatter.author,
            date: frontmatter.date,
            readTime: frontmatter.readTime,
            coverImage,
            link: `/blog/${slug}`,
          };
        })
    );

    blogs = blogList
      .filter(Boolean)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (err) {
    console.error("Error fetching blogs:", err);
  }

  if (!blogs.length) return renderEmpty();

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const startIndex = (page - 1) * blogsPerPage;
  const paginatedBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-background/80 px-6 py-16">
      <HorizontalAdComponent />
      <div className="text-center mb-12">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-foreground mb-6 leading-tight">
          Read Our <br />
          <span className="text-primary">Latest Blogs</span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest insights, tutorials, and trends in AI
          development.
        </p>
      </div>

      <div className="flex justify-center mb-12">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full bg-card border border-border rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
        </div>
      </div>

      <div className="w-full my-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {paginatedBlogs.map((blog) => (
          <Link
            href={blog.link}
            key={blog.id}
            className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/40 transition-all duration-300"
          >
            <div className="relative w-full h-56 overflow-hidden">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-fill group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-5 flex flex-col space-y-3">
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {blog.title}
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <User size={14} />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          {page > 1 && (
            <Link
              href={`?page=${page - 1}`}
              className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-primary/10 transition"
            >
              Previous
            </Link>
          )}
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <Link
              href={`?page=${page + 1}`}
              className="px-4 py-2 border border-border rounded-lg text-sm hover:bg-primary/10 transition"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function renderEmpty() {
  return (
    <div className="min-h-screen flex items-center justify-center text-muted-foreground">
      <p>No blogs found.</p>
    </div>
  );
}
