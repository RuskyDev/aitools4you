"use client";
import React from 'react';
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ITEMS_PER_PAGE = 9;

import HorizontalAdComponent from "@/components/HorizontalAdComponent";
import SkeletonCard from "@/components/ui/SkeletonCard";

import siteConfig from "@/config/site.config";

export const metadata = {
  title: `${siteConfig.name} | Home`,
};

export default function Page() {
  const [tools, setTools] = useState([]);
  const [tags, setTags] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const clientsCarouselRef = useRef(null);

  const [featuredTools, setFeaturedTools] = useState([
    {
      id: 1,
      name: "Playground AI",
      description:
        "Free AI art generator for creating and editing images with Stable Diffusion-based models.",
      iconUrl: "https://playground.com/favicon.ico",
      url: "https://playground.com/",
    },
    {
      id: 2,
      name: "Phind",
      description:
        "AI-powered search engine and coding assistant designed specifically for developers.",
      iconUrl: "https://www.phind.com/favicon.ico",
      url: "https://www.phind.com/",
    },
    {
      id: 3,
      name: "FlowGPT",
      description:
        "Community-driven platform to discover, share, and optimize AI prompts for various use cases.",
      iconUrl: "https://flowgpt.com/favicon.ico",
      url: "https://flowgpt.com/",
    },
  ]);

  const clientLogos = [
    { id: 1, name: "Client 1", logoUrl: "logo.png" },
    { id: 2, name: "Client 2", logoUrl: "logo.png" },
    { id: 3, name: "Client 3", logoUrl: "logo.png" },
    { id: 4, name: "Client 4", logoUrl: "logo.png" },
    { id: 5, name: "Client 5", logoUrl: "logo.png" },
  ];

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("/tools.json").then((res) => res.json()),
      fetch("/tags.json").then((res) => res.json()),
    ])
      .then(([toolsData, tagsData]) => {
        const validTools = toolsData.filter((tool) =>
          tool.tags.some((tag) => tagsData.includes(tag))
        );
        setTools(validTools);
        setTags(["All", ...tagsData]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const clientsInterval = setInterval(() => {
      if (clientsCarouselRef.current) {
        clientsCarouselRef.current.scrollLeft += 1;
        if (
          clientsCarouselRef.current.scrollLeft >=
          clientsCarouselRef.current.scrollWidth -
            clientsCarouselRef.current.clientWidth
        ) {
          clientsCarouselRef.current.scrollLeft = 0;
        }
      }
    }, 25);
    return () => clearInterval(clientsInterval);
  }, []);

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase()) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));

    const matchesFilter =
      filter === "All" || tool.tags.some((tag) => tag === filter);

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTools = filteredTools.slice(startIndex, endIndex);

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));

  const handleTagChange = (tag) => {
    setFilter(tag);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 relative">
      <HorizontalAdComponent
        src="https://qmxubuxchxlzzzhxvvcc.supabase.co/storage/v1/object/public/Ad%20Banner%20Designs/Top%20Side%20Ad-15-10-2025.gif"
        redirectTo={"https://astrad.io/"}
      />

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-start text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-foreground leading-snug sm:leading-tight">
            Explore the Latest <br />
            <span className="text-primary">AI Tools</span>
          </h1>
          <p className="text-base sm:text-lg mb-10 max-w-xl text-muted-foreground">
            Discover top AI tools built for developers, designers, and creators.
            Boost productivity, speed up your workflow, and stay ahead in the AI
            era.
          </p>
        </div>

        <div className="w-full my-12">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Featured AI Tools
          </h2>

          {/* Paid Featured AI Tools */}
          <div className="relative overflow-hidden mb-12">
            <motion.div
              className="flex gap-6"
              animate={{
                x: [0, -1032],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
            >
              {[...featuredTools, ...featuredTools].map((tool, index) => (
                <div
                  key={`${tool.id}-${index}`}
                  className="flex-shrink-0 w-[300px] h-[280px] bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <img
                        src={tool.iconUrl}
                        alt={`${tool.name} icon`}
                        className="w-12 h-12 rounded"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-card-foreground line-clamp-1">
                      {tool.name}
                    </h3>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow-0">
                    {tool.description}
                  </p>

                  <a
                    href={tool.url}
                    className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mt-auto"
                  >
                    Visit Website
                    <ExternalLink size={18} />
                  </a>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="my-12"></div>
          <div className="w-full my-12">
            <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          </div>

          <div className="flex justify-center items-center w-full mt-6">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-2xl">
              <div className="relative flex-1 w-full">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search AI tools..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-5 py-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>

              <div className="relative w-full sm:w-48">
                <SlidersHorizontal
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <select
                  value={filter}
                  onChange={(e) => handleTagChange(e.target.value)}
                  className="w-full pl-10 pr-5 py-3 rounded-xl border border-border bg-input text-foreground shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-ring transition"
                >
                  {tags.map((tag, i) => (
                    <option key={i} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="my-12"></div>

          {/* Normal Featured AI Tools */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {currentTools.map((tool, index) => (
                  <React.Fragment key={tool.id}>
                    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <img
                            src={tool.iconUrl}
                            alt={`${tool.name} icon`}
                            className="w-12 h-12 rounded"
                          />
                        </div>
                        <h3 className="text-xl font-bold text-card-foreground">
                          {tool.name}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {tool.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-muted-foreground mb-6 flex-grow">
                        {tool.description}
                      </p>

                      <a
                        href={tool.url}
                        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                      >
                        Visit Website
                        <ExternalLink size={18} />
                      </a>
                    </div>

                    {index === 2 && (
                      <div className="block sm:hidden">
                        <HorizontalAdComponent
                          src="https://qmxubuxchxlzzzhxvvcc.supabase.co/storage/v1/object/public/Ad%20Banner%20Designs/Top%20Side%20Ad-15-10-2025.gif"
                          redirectTo="https://astrad.io/"
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Pagination & Filters*/}
              {filteredTools.length > 0 && (
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

              {filteredTools.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No tools found matching your search.
                  </p>
                </div>
              )}
            </>
          )}

          <div className="block sm:hidden">
            <HorizontalAdComponent
              src="https://qmxubuxchxlzzzhxvvcc.supabase.co/storage/v1/object/public/Ad%20Banner%20Designs/Top%20Side%20Ad-15-10-2025.gif"
              redirectTo="https://astrad.io/"
            />
          </div>

          {/* Our Clients Section */}
          {/* <div className="mt-16 mb-12">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">
              Our Clients
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
              Trusted by industry leaders and innovative companies worldwide
            </p>

            <div
              ref={clientsCarouselRef}
              className="flex gap-4 overflow-x-hidden whitespace-nowrap py-8 px-2"
            >
              {clientLogos.map((client) => (
                <div
                  key={client.id}
                  className="inline-flex items-center justify-center min-w-[160px] h-40 p-2 hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={client.logoUrl}
                    alt={`${client.name} logo`}
                    className="max-w-full max-h-24 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}

              {clientLogos.map((client) => (
                <div
                  key={`${client.id}-duplicate`}
                  className="inline-flex items-center justify-center min-w-[160px] h-40 p-2 hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={client.logoUrl}
                    alt={`${client.name} logo`}
                    className="max-w-full max-h-24 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
