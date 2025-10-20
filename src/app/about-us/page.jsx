"use client";

import siteConfig from "@/config/site.config";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function AboutPage() {
  const currentYear = new Date().getFullYear();

  const stats = {
    tools: 1263,
    users: 7151,
    visitors: 21451,
  };

  const [counts, setCounts] = useState({ tools: 0, users: 0, visitors: 0 });

  useEffect(() => {
    const duration = 2000; 
    const frameRate = 60;
    const totalFrames = Math.round((duration / 1000) * frameRate);

    const increment = {
      tools: stats.tools / totalFrames,
      users: stats.users / totalFrames,
      visitors: stats.visitors / totalFrames,
    };

    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      setCounts({
        tools: Math.min(stats.tools, Math.floor(increment.tools * frame)),
        users: Math.min(stats.users, Math.floor(increment.users * frame)),
        visitors: Math.min(stats.visitors, Math.floor(increment.visitors * frame)),
      });

      if (frame === totalFrames) clearInterval(counter);
    }, 1000 / frameRate);

    return () => clearInterval(counter);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="flex flex-col items-center justify-start px-6 py-16 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-foreground leading-tight">
          About Us
        </h1>
        <p className="text-lg sm:text-xl max-w-3xl text-muted-foreground">
          Learn more about <span className="font-semibold">{siteConfig.name}</span> and our
          mission to provide the best AI tools for everyone.
        </p>
      </div>

      <div className="w-full px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>

      <div className="px-6 py-16">
        <div className="max-w-5xl mx-auto space-y-12 text-foreground">
          <section>
            <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
            <p className="text-muted-foreground">
              <span className="font-semibold">{siteConfig.name}</span> is a platform dedicated to curating the best AI tools for developers, businesses, and enthusiasts. We aim to make AI tools accessible, reliable, and easy to find.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              Our mission is to empower users by providing a comprehensive directory of AI tools while ensuring quality, transparency, and innovation. We strive to connect users with tools that improve productivity and creativity.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Our Numbers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <motion.p 
                  className="text-4xl font-extrabold text-primary"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  {counts.tools}+
                </motion.p>
                <p className="text-muted-foreground mt-2">AI Tools</p>
              </div>
              <div>
                <motion.p 
                  className="text-4xl font-extrabold text-primary"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  {counts.users}+
                </motion.p>
                <p className="text-muted-foreground mt-2">Unique Users</p>
              </div>
              <div>
                <motion.p 
                  className="text-4xl font-extrabold text-primary"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                >
                  {counts.visitors}+
                </motion.p>
                <p className="text-muted-foreground mt-2">Visitors</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              For questions or feedback, reach out via our{" "}
              <a href="/contact" className="text-primary font-semibold underline">Contact page</a>.
            </p>
          </section>

          <section className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
