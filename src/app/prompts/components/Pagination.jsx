"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPrev, onNext }) {
  return (
    <div className="flex items-center justify-center gap-6">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-card border border-border text-foreground hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <span className="text-foreground font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-card border border-border text-foreground hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
