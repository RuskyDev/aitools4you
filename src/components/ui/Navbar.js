"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaDiscord,
  FaXTwitter,
  FaReddit,
} from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import siteConfig from "@/config/site.config";

const iconMap = {
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaDiscord,
  FaXTwitter,
  FaReddit,
};

export default function Navbar({ navItems }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  const siteName = siteConfig.name || "Website";
  const validItems = (navItems || siteConfig.navigationBarItems || []).filter(
    (i) => i?.label && i?.href
  );
  const socialLinks = siteConfig.socialMediaLinks || [];

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
      <nav
        className="w-full h-16 sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
        aria-label="Main Navigation"
      >
        <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-full">
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

          <ul className="hidden md:flex gap-10 text-muted-foreground">
            {validItems.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="hover:text-primary transition cursor-pointer"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
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

            <div className="hidden md:flex gap-5">
              {socialLinks.map(({ label, href, icon }) => {
                const Icon = iconMap[icon];
                return (
                  Icon && (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${label} page`}
                      className="text-muted-foreground hover:text-primary transition"
                    >
                      <Icon size={20} />
                    </Link>
                  )
                );
              })}
            </div>

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
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 flex flex-col items-center justify-center gap-8"
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

            {validItems.map(({ label, href }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={href}
                  className="text-2xl font-semibold text-foreground hover:text-primary transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              </motion.div>
            ))}

            <div className="flex gap-6 mt-6">
              {socialLinks.map(({ label, href, icon }, i) => {
                const Icon = iconMap[icon];
                return (
                  Icon && (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit our ${label} page`}
                        className="text-muted-foreground hover:text-primary transition"
                        onClick={() => setMenuOpen(false)}
                      >
                        <Icon size={28} />
                      </Link>
                    </motion.div>
                  )
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
