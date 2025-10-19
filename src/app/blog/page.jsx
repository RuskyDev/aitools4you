"use client";
import { useState, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Lightbulb,
  Code,
  Zap,
  Rocket,
  Brain,
  Sparkles,
  Target,
} from "lucide-react";
import Link from "next/link";
import siteConfig from "@/config/site.config";

// export const metadata = {
//   title: `${siteConfig.name} | Blog`,
// };


const ITEMS_PER_PAGE = 5;

const iconMap = {
  BookOpen,
  Lightbulb,
  Code,
  Zap,
  Rocket,
  Brain,
  Sparkles,
  Target,
};

const SkeletonCard = () => (
  <div className="bg-card border border-border rounded-xl p-6 flex items-center gap-6 animate-pulse">
    <div className="bg-muted p-4 rounded-lg">
      <div className="w-8 h-8 bg-muted rounded"></div>
    </div>
    <div className="flex-1 space-y-3">
      <div className="h-6 bg-muted rounded w-48"></div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
      </div>
    </div>
    <div className="h-10 bg-muted rounded-lg w-24"></div>
  </div>
);

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    // Simulating API call with mock data
    setTimeout(() => {
      const mockBlogs = [
        // {
        //   id: 1,
        //   icon: "Lightbulb",
        //   name: "Getting Started with AI Development",
        //   description:
        //     "Learn the fundamentals of AI development and how to build your first intelligent application.",
        // },
        // {
        //   id: 2,
        //   icon: "Code",
        //   name: "Best Practices for Prompt Engineering",
        //   description:
        //     "Master the art of crafting effective prompts to get the most out of AI language models.",
        // },
        // {
        //   id: 3,
        //   icon: "Rocket",
        //   name: "Deploying AI Models to Production",
        //   description:
        //     "A comprehensive guide to taking your AI models from development to production environments.",
        // },
        // {
        //   id: 4,
        //   icon: "Brain",
        //   name: "Understanding Neural Networks",
        //   description:
        //     "Deep dive into the architecture and mechanics of neural networks and deep learning.",
        // },
        // {
        //   id: 5,
        //   icon: "Zap",
        //   name: "Optimizing AI Performance",
        //   description:
        //     "Tips and techniques for improving the speed and efficiency of your AI applications.",
        // },
        // {
        //   id: 6,
        //   icon: "Sparkles",
        //   name: "Creative AI Use Cases",
        //   description:
        //     "Explore innovative ways businesses are leveraging AI to solve real-world problems.",
        // },
        // {
        //   id: 7,
        //   icon: "Target",
        //   name: "AI Ethics and Responsible Development",
        //   description:
        //     "Understanding the ethical implications and best practices for responsible AI development.",
        // },
        // {
        //   id: 8,
        //   icon: "BookOpen",
        //   name: "Machine Learning Fundamentals",
        //   description:
        //     "A beginner-friendly introduction to machine learning concepts and algorithms.",
        // },
      ];
      setBlogs(mockBlogs);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.name.toLowerCase().includes(search.toLowerCase()) ||
      blog.description.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="flex flex-col items-center justify-start px-6 py-16 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-foreground leading-tight">
          Read Our <br />
          <span className="text-primary">Latest Blogs</span>
        </h1>
        <p className="text-lg sm:text-xl mb-12 max-w-2xl text-muted-foreground">
          Stay updated with the latest insights, tutorials, and trends in AI
          development. Learn from experts and grow your skills.
        </p>

        <div className="relative w-full max-w-2xl">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={20}
          />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-5 py-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
          />
        </div>
      </div>

      <div className="w-full px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>

      <div className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="space-y-6 mb-12">
              {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-12">
                {currentBlogs.map((blog) => {
                  const IconComponent = iconMap[blog.icon] || BookOpen;
                  return (
                    <div
                      key={blog.id}
                      className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col sm:flex-row items-start sm:items-center gap-6"
                    >
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-card-foreground mb-2">
                          {blog.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {blog.description}
                        </p>
                      </div>

                      <Link
                        href="/test"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-6 rounded-lg transition-colors duration-200 whitespace-nowrap"
                      >
                        Read More
                      </Link>
                    </div>
                  );
                })}
              </div>

              {filteredBlogs.length > 0 && (
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-card border border-border text-foreground hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <span className="text-foreground font-medium">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-card border border-border text-foreground hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-border transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}

              {filteredBlogs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No blogs found.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
