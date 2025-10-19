"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FaLinkedin, FaInstagram, FaFacebook, FaDiscord } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import siteConfig from "@/config/site.config";

const iconMap = { FaLinkedin, FaInstagram, FaFacebook, FaDiscord };

export default function Navbar({ navItems }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const siteName = siteConfig.name || "Website";
  const validItems = (navItems || siteConfig.navigationBarItems || []).filter(
    (i) => i?.label && i?.href
  );
  const socialLinks = siteConfig.socialMediaLinks || [];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [menuOpen]);

  return (
    <>
      <nav className="w-full h-16 px-6 flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => setMenuOpen(true)}
            className="md:hidden w-6 h-6 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={24} />
          </motion.button>

          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt={`${siteName} Logo`}
              width={120}
              height={40}
              className="h-10 w-auto object-contain hidden md:block"
              priority
            />
            <span className="text-2xl font-bold text-primary pl-2">
              {siteName}
            </span>
          </Link>
        </div>

        {validItems.length > 0 && (
          <ul className="hidden md:flex gap-8 text-muted-foreground absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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
        )}

        <div className="hidden md:flex items-center gap-4">
          {socialLinks.map(({ label, href, icon }) => {
            const Icon = iconMap[icon];
            return (
              Icon && (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  <Icon size={20} />
                </Link>
              )
            );
          })}
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
          >
            <motion.button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-foreground"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
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
