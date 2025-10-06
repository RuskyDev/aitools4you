"use client";
import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import siteConfig from "@/config/site.config";

export default function Footer() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/tags.json")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {siteConfig.name}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Your ultimate destination for discovering and exploring the latest
              AI tools and resources. Stay ahead in the AI revolution.
            </p>
            <div className="flex gap-4">
              {siteConfig.links.map((link) => {
                const Icon = Icons[link.icon] || Icons.Circle;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                  >
                    <Icon className="text-muted-foreground" size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {siteConfig.navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat.id}>
                    <button className="text-muted-foreground hover:text-primary transition-colors">
                      {cat.name}
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-muted-foreground/70">
                  No categories available
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2025 {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              {siteConfig.legal.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
