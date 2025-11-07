"use client";
import React, { useState, useEffect } from "react";
import HorizontalAdComponent from "@/components/HorizontalAdComponent";
import Searchbar from "./components/SearchBar";
import FiltersDropdown from "./components/FiltersDropdown";
import Pagination from "./components/Pagination";
import PromptCard from "./components/PromptCard";

const getItemsPerPage = () => {
  if (typeof window === "undefined") return 9;
  const width = window.innerWidth;
  if (width < 640) return 9;
  if (width < 1024) return 10;
  return 9;
};

export default function Page() {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => setItemsPerPage(getItemsPerPage());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/prompts");
        const data = await res.json();
        if (Array.isArray(data)) {
          const withImages = data.map((p) => ({
            ...p,
            image_url: p.image_url || "/default-prompt.webp",
          }));
          setPrompts(withImages);
        } else setPrompts([]);
      } catch {
        setPrompts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, []);

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      prompt.title?.toLowerCase().includes(search.toLowerCase()) ||
      prompt.description?.toLowerCase().includes(search.toLowerCase()) ||
      (prompt.tags || []).some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      );
    const matchesFilter =
      filter === "All" || (prompt.tags || []).includes(filter);
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredPrompts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPrompts = filteredPrompts.slice(startIndex, endIndex);

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNextPage = () =>
    setCurrentPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-background/80 relative">
      <HorizontalAdComponent />

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-foreground leading-snug sm:leading-tight">
            Explore the Latest <br />
            <span className="text-primary">AI Prompts</span>
          </h1>
          <p className="text-base sm:text-lg mb-10 max-w-xl text-muted-foreground">
            Discover powerful prompts to supercharge your workflow and creativity.
          </p>
        </div>

        <div className="w-full my-12">
          <div className="h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"></div>
        </div>

        <div className="flex justify-center items-center w-full mt-6">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-2xl">
            <Searchbar onSearchChange={handleSearchChange} />
            <FiltersDropdown prompts={prompts} onFilterChange={handleFilterChange} />
          </div>
        </div>

        <div className="my-12"></div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(itemsPerPage)].map((_, i) => (
              <PromptCard key={i} loading />
            ))}
          </div>
        ) : (
          <>
            {currentPrompts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {currentPrompts.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPrev={handlePrevPage}
                  onNext={handleNextPage}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No prompts found matching your search.
                </p>
              </div>
            )}
          </>
        )}

        <div className="block sm:hidden mt-10">
          <HorizontalAdComponent />
        </div>
      </div>
    </div>
  );
}
