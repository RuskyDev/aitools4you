"use client";
import { FaLinkedin, FaInstagram, FaFacebook, FaDiscord, FaXTwitter, FaReddit } from "react-icons/fa6";
import siteConfig from "@/config/site.config";

export default function Footer() {
  const year = new Date().getFullYear();
  const { name = "Website", socialMediaLinks = [], navigationBarItems = [], footerItems = [] } = siteConfig;

  const iconMap = { FaLinkedin, FaInstagram, FaFacebook, FaDiscord, FaXTwitter, FaReddit };

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
            <div className="flex gap-4">
              {socialMediaLinks.map(({ label, href, icon }) => {
                const Icon = iconMap[icon] || Circle;
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
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navigationBarItems.map(({ label, href }) => (
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
              <h4 className="text-lg font-semibold text-foreground mb-4">{category}</h4>
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
