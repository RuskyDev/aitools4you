"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Mic } from "lucide-react";

export default function Searchbar({ onSearchChange }) {
  const [search, setSearch] = useState("");

  const handleSearch = (value) => {
    setSearch(value);
    onSearchChange(value);
  };

  return (
    <div className="relative flex-1 w-full">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={20}
      />
      <input
        type="text"
        placeholder="Search AI Prompts..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full pl-10 pr-12 py-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
      />
      {/* <button className="absolute right-3 top-1/2 -translate-y-1/2 transition">
        <motion.div
          key="off"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            color: "var(--muted-foreground)",
          }}
          transition={{ duration: 0.3 }}
        >
          <Mic size={20} />
        </motion.div>
      </button> */}
    </div>
  );
}
