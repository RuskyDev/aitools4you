"use client";
import { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";

export default function FiltersDropdown({ prompts, onFilterChange }) {
  const [filter, setFilter] = useState("All");
  const [tags, setTags] = useState(["All"]);

  useEffect(() => {
    if (Array.isArray(prompts)) {
      const allTags = ["All", ...new Set(prompts.flatMap((p) => p.tags || []))];
      setTags(allTags);
    }
  }, [prompts]);

  const handleTagChange = (tag) => {
    setFilter(tag);
    onFilterChange(tag);
  };

  return (
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
  );
}
