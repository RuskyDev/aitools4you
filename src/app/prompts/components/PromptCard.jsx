"use client";
import { ExternalLink } from "lucide-react";

export default function PromptCard({ prompt, loading = false }) {
  if (loading) {
    return (
      <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col animate-pulse">
        <div className="h-32 bg-muted"></div>
        <div className="p-6">
          <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="h-5 bg-muted rounded-full w-12"></div>
            <div className="h-5 bg-muted rounded-full w-16"></div>
            <div className="h-5 bg-muted rounded-full w-10"></div>
          </div>
          <div className="h-16 bg-muted rounded mb-6"></div>
          <div className="h-10 bg-muted rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col group">
      <div className="relative h-32 overflow-hidden">
        <img
          src={
            prompt.image_url ||
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
          }
          alt={prompt.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-card-foreground mb-2">
          {prompt.title}
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {(prompt.tags || []).map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-muted-foreground mb-6 grow">{prompt.description}</p>
        <a
          href={`/prompts/view/${prompt.id}`}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          View Details
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  );
}
