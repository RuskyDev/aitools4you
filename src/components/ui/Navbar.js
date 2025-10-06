"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import siteConfig from "@/config/site.config";

export default function Navbar({ navItems }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const validItems = navItems.filter((item) => item && item.label && item.href);

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
          <div className="text-2xl font-bold text-primary">
            {siteConfig.name}
          </div>
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
