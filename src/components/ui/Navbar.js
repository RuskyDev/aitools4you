"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaDiscord,
  FaXTwitter,
  FaReddit,
  FaYoutube,
} from "react-icons/fa6";
import siteConfig from "@/config/site.config";

export default function Navbar({ navItems }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const siteName = siteConfig.name;
  const { socialMediaLinks = [] } = siteConfig;

  const iconMap = {
    falinkedin: FaLinkedin,
    fainstagram: FaInstagram,
    fafacebook: FaFacebook,
    fadiscord: FaDiscord,
    fax: FaXTwitter,
    fareddit: FaReddit,
    fayoutube: FaYoutube,
  };

  const validItems = (navItems || siteConfig.navigationBarItems || []).filter(
    (i) => i?.label && i?.href && i.showOn?.includes("navbar")
  );

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  const handleSearchClick = () => {
    const el = document.getElementById("search-input");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus({ preventScroll: true });
    }
  };

  return (
    <>
      <nav className="w-full h-16 sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/ai-tools-4-you-logo.svg"
              alt={`${siteName} Logo`}
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="text-xl md:text-2xl font-bold text-primary">
              {siteName}
            </span>
          </Link>

          <ul className="hidden md:flex items-center gap-10 text-muted-foreground absolute left-1/2 transform -translate-x-1/2 h-full">
            {validItems.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <li key={label} className="flex items-center h-full">
                  <Link
                    href={href}
                    className={`transition cursor-pointer flex items-center h-full ${
                      isActive
                        ? "text-primary"
                        : "hover:text-primary text-muted-foreground"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-5 ml-auto">
            {pathname === "/" && (
              <motion.button
                onClick={handleSearchClick}
                className="md:hidden w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-primary transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Open Search"
              >
                <Search size={22} />
              </motion.button>
            )}
            <motion.button
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-8 h-8 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </motion.button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex flex-col items-center justify-between py-12"
            aria-modal="true"
            role="dialog"
          >
            <motion.button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-foreground"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close Menu"
            >
              <X size={32} />
            </motion.button>

            <div className="flex flex-col items-center gap-4 w-full flex-1 justify-center">
              <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <Image
                    src="/ai-tools-4-you-logo.svg"
                    alt={`${siteConfig.name} Logo`}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                  <span className="text-3xl whitespace-nowrap font-bold text-primary text-center sm:text-left">
                    {siteConfig.name}
                    <span className="block text-lg font-medium mt-2 text-white leading-none">
                      Think Smarter. Work Easy.
                    </span>
                  </span>
                </div>
              </div>

              {validItems.map(({ label, href }, i) => {
                const isActive = pathname === href;
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={href}
                      className={`text-2xl font-semibold transition text-center ${
                        isActive
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex gap-4 mt-8">
              {siteConfig.socialMediaLinks?.map(({ label, href, icon }) => {
                const iconMap = {
                  falinkedin: FaLinkedin,
                  fainstagram: FaInstagram,
                  fafacebook: FaFacebook,
                  fadiscord: FaDiscord,
                  fax: FaXTwitter,
                  fareddit: FaReddit,
                  fayoutube: FaYoutube,
                };
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
                    <Icon size={22} className="text-muted-foreground" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
