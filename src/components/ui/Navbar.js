"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Linkedin, Instagram, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import siteConfig from "@/config/site.config";

const iconMap = {
  Linkedin,
  Instagram,
  Mail,
};

export default function Navbar({ navItems }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const validItems = navItems.filter((item) => item && item.label && item.href);
  const socialLinks = siteConfig.links || [];

  return (
    <>
      <nav className="w-full h-16 px-6 flex items-center justify-between sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <motion.button
              onClick={() => setMenuOpen(true)}
              className="flex flex-col justify-center w-6 h-6 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu size={24} />
            </motion.button>
          </div>

          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={40}
              className="h-10 w-auto object-contain hidden md:block"
              priority
            />
            <span className="text-2xl font-bold text-primary md:hidden">
              AI TOOLS 4 YOU
            </span>
          </Link>
        </div>

        {validItems.length > 0 && (
          <ul className="hidden md:flex gap-8 text-muted-foreground absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {validItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="hover:text-primary transition cursor-pointer"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="hidden md:flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            if (!Icon) return null;
            return (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition"
              >
                <Icon size={20} />
              </Link>
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
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.5,
            }}
            className="fixed top-0 right-0 w-full h-full bg-background/95 backdrop-blur-md z-50 flex flex-col items-center justify-center gap-8"
          >
            <motion.button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-foreground text-2xl font-bold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={32} />
            </motion.button>

            {validItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
              >
                <Link
                  href={item.href}
                  className="text-2xl font-semibold text-foreground hover:text-primary transition cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <div className="flex gap-6 mt-6">
              {socialLinks.map((link, i) => {
                const Icon = iconMap[link.icon];
                if (!Icon) return null;
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Icon size={28} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
