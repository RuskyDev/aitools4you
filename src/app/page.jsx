"use client";
import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 9;

const SkeletonCard = () => (
  <div className="bg-card border border-border rounded-xl p-6 flex flex-col animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <div className="bg-muted p-2 rounded-lg">
        <div className="w-12 h-12 bg-muted rounded"></div>
      </div>
      <div className="h-6 bg-muted rounded w-32"></div>
    </div>

    <div className="flex flex-wrap gap-2 mb-4">
      <div className="h-6 bg-muted rounded-full w-16"></div>
      <div className="h-6 bg-muted rounded-full w-20"></div>
      <div className="h-6 bg-muted rounded-full w-14"></div>
    </div>

    <div className="space-y-2 mb-6 flex-grow">
      <div className="h-4 bg-muted rounded w-full"></div>
      <div className="h-4 bg-muted rounded w-5/6"></div>
      <div className="h-4 bg-muted rounded w-4/6"></div>
    </div>

    <div className="h-12 bg-muted rounded-lg"></div>
  </div>
);

export default function Page() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch("/tools.json")
      .then((res) => res.json())
      .then((data) => {
        setTools(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(search.toLowerCase()) ||
    tool.description.toLowerCase().includes(search.toLowerCase()) ||
    tool.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTools = filteredTools.slice(startIndex, endIndex);

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="flex flex-col items-center justify-start px-6 py-16 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-foreground leading-tight">
          Discover the Best <br />
          <span className="text-primary">AI Tools</span>
        </h1>
        <p className="text-lg sm:text-xl mb-12 max-w-2xl text-muted-foreground">
          Curated collection of powerful AI tools for developers, designers, and
          creators. Build faster, create better, and stay ahead of the curve.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
          <div className="relative flex-1">
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
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-5 py-3 rounded-xl border border-border bg-input text-foreground shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-ring transition"
            >
              <option value="All">All</option>
            </select>
          </div>
        </div>
      </div>

      <div className="w-full px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>

      <div className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Featured AI Tools
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {currentTools.map((tool) => {
                  return (
                    <div
                      key={tool.id}
                      className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <img 
                            src={tool.iconUrl} 
                            alt={`${tool.name} icon`}
                            className="w-12 h-12 rounded"
                          />
                        </div>
                        <h3 className="text-xl font-bold text-card-foreground">{tool.name}</h3>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {tool.tags.map((tag, index) => (
                          <span
                            key={index}
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
                  );
                })}
              </div>

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
        </div>
      </div>
    </div>
  );
}