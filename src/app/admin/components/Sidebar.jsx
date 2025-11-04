'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Wrench, Tag, FileText, Home, SquareChartGantt } from "lucide-react";
import siteConfig from "@/config/site.config";

export default function Sidebar() {
  const [logoSrc, setLogoSrc] = useState("/ai-tools-4-you-logo.svg");
  const pathname = usePathname();

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Tag, label: "Tags", href: "/admin/dashboard/tags" },
    { icon: Wrench, label: "Tools", href: "/admin/dashboard/tools" },
    { icon: SquareChartGantt, label: "Prompts", href: "/admin/dashboard/prompts" },
    { icon: FileText, label: "Blogs", href: "/admin/dashboard/blogs" },
  ];

  return (
    <aside className="w-60 bg-sidebar border-r border-sidebar-border fixed h-screen flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 relative">
            <Image
              src={logoSrc}
              alt={siteConfig.name}
              fill
              className="object-contain"
              onError={() => setLogoSrc("/ai-tools-4-you-logo.png")}
            />
          </div>
          <span className="font-semibold text-sidebar-foreground text-lg">
            {siteConfig.name}
          </span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 group-hover:text-sidebar-primary ${
                      isActive ? "text-sidebar-primary" : "text-muted-foreground"
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
