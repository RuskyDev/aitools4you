"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaDiscord,
  FaXTwitter,
  FaReddit,
  FaYoutube,
  FaMoon,
  FaSun,
} from "react-icons/fa6";
import siteConfig from "@/config/site.config";

export default function Footer() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [userPreferences, setUserPreferences] = useState({ theme: "light" });

  useEffect(() => {
    const body = document.body;
    const savedPrefs = localStorage.getItem("Preferences");
    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      setUserPreferences(prefs);
      if (prefs.theme === "dark") {
        body.classList.add("dark");
        body.classList.remove("light");
        setIsDark(true);
      } else {
        body.classList.add("light");
        body.classList.remove("dark");
        setIsDark(false);
      }
    } else {
      setIsDark(body.classList.contains("dark"));
    }
  }, []);

  const changeUserPreferences = (prefs) => {
    setUserPreferences((prev) => {
      const updated = { ...prev, ...prefs };
      localStorage.setItem("Preferences", JSON.stringify(updated));
      return updated;
    });

    if (prefs.theme) {
      const body = document.body;
      if (prefs.theme === "dark") {
        body.classList.add("dark");
        body.classList.remove("light");
        setIsDark(true);
      } else {
        body.classList.add("light");
        body.classList.remove("dark");
        setIsDark(false);
      }
    }
  };

  const toggleTheme = () => {
    changeUserPreferences({ theme: isDark ? "light" : "dark" });
  };

  if (pathname.startsWith("/admin")) return null;

  const year = new Date().getFullYear();
  const {
    name = "Website",
    socialMediaLinks = [],
    navigationBarItems = [],
    footerItems = [],
  } = siteConfig;

  const iconMap = {
    falinkedin: FaLinkedin,
    fainstagram: FaInstagram,
    fafacebook: FaFacebook,
    fadiscord: FaDiscord,
    fax: FaXTwitter,
    fareddit: FaReddit,
    fayoutube: FaYoutube,
  };

  const groupedFooterItems = footerItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-foreground mb-4">{name}</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {siteConfig.description}
            </p>
            <div className="flex gap-4 items-center">
              {socialMediaLinks.map(({ label, href, icon }) => {
                const Icon = iconMap[icon?.toLowerCase()];
                if (!Icon) return null;
                return (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
                  >
                    <Icon size={20} className="text-muted-foreground" />
                  </a>
                );
              })}

              <button
                onClick={toggleTheme}
                className="p-2 bg-muted hover:bg-muted/80 rounded-lg transition-all duration-300 relative overflow-hidden group"
                aria-label="Toggle theme"
              >
                <div className="relative w-5 h-5">
                  <FaSun
                    size={20}
                    className={`absolute inset-0 text-muted-foreground transition-all duration-500 ${
                      isDark
                        ? "rotate-90 scale-0 opacity-0"
                        : "rotate-0 scale-100 opacity-100"
                    }`}
                  />
                  <FaMoon
                    size={20}
                    className={`absolute inset-0 text-muted-foreground transition-all duration-500 ${
                      isDark
                        ? "rotate-0 scale-100 opacity-100"
                        : "-rotate-90 scale-0 opacity-0"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navigationBarItems
                .filter(
                  (i) => i?.label && i?.href && i.showOn?.includes("footer")
                )
                .map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

          {Object.entries(groupedFooterItems).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold text-foreground mb-4">
                {category}
              </h4>
              <ul className="space-y-2">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {year} {name}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
