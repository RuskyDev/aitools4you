"use client";
import * as Icons from "lucide-react";
import siteConfig from "@/config/site.config";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const copyright =
    siteConfig.footer.copyrightStartYear === currentYear
      ? currentYear
      : `${siteConfig.footer.copyrightStartYear}–${currentYear}`;

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {siteConfig.name}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {siteConfig.description}
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
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {copyright} {siteConfig.name}. All rights reserved.
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
