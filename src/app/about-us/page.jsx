"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Rocket } from "lucide-react";
import siteConfig from "@/config/site.config";

export default function AboutPage() {

  const stats = {
    tools: 3263,
    users: 33151,
    visitors: 54451,
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
        visitors: Math.min(
          stats.visitors,
          Math.floor(increment.visitors * frame)
        ),
      });

      if (frame === totalFrames) clearInterval(counter);
    }, 1000 / frameRate);

    return () => clearInterval(counter);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
      <motion.div
        drag
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        whileDrag={{ scale: 1.2, cursor: "grabbing" }}
        className="absolute top-20 right-10 text-primary/30 cursor-grab z-50 hidden lg:block"
        animate={{ rotate: [0, 15, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles size={48} />
      </motion.div>

      <motion.div
        drag
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        whileDrag={{ scale: 1.2, cursor: "grabbing" }}
        className="absolute top-1/3 left-20 text-accent/30 cursor-grab z-50 hidden lg:block"
        animate={{ rotate: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Zap size={56} />
      </motion.div>

      <motion.div
        drag
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        whileDrag={{ scale: 1.2, cursor: "grabbing" }}
        className="absolute bottom-32 right-1/4 text-primary/30 cursor-grab z-50 hidden lg:block"
        animate={{ rotate: [0, 12, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Rocket size={52} />
      </motion.div>

      <div className="flex flex-col items-center justify-start px-6 py-16 text-center relative z-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-foreground leading-tight">
          About Us
        </h1>
        <p className="text-lg sm:text-xl max-w-3xl text-muted-foreground">
          Learn more about{" "}
          <span className="font-semibold">{siteConfig.name}</span> and our
          mission to provide the best AI tools for everyone.
        </p>
      </div>

      <div className="w-full px-6 relative z-10">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      </div>

      <div className="px-6 py-16 relative z-10">
        <div className="max-w-5xl mx-auto space-y-12 text-foreground">
          <section>
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-muted-foreground text-justify">
              We currently provide a carefully curated collection of <span className="text-primary">AI Tools</span>, 
              <span className="text-lime-500" title="Coming Soon!" > AI Prompts</span>, {" "} 
              <span className="text-blue-500" title="Coming Soon!">
                AegisX AI (Cybersecurity Insights)
              </span>{" "}and <span className="text-violet-600" title="Coming Soon!" >AI Chronicles</span> designed to empower
              developers, businesses, and AI enthusiasts alike. Our goal is to
              make cutting-edge AI resources simple and accessible. In the near
              future, we plan to expand our offerings with prompt libraries,
              step-by-step tutorials, and advanced features that will help users
              learn, create, and innovate more efficiently in the world of AI.
            </p>
          </section>
          <section>
            <h2 className="text-3xl font-bold mb-4 text-justify">Who We Are</h2>
            <p className="text-muted-foreground">
              It all started with a Gen Z vision, a spark to make AI knowledge
              accessible for everyone. At{" "}
              <span className="text-primary">{siteConfig.name}</span>, we're not
              just another tech platform, we're a growing community built by
              curious minds who believe AI can empower anyone, from developers
              and designers to entrepreneurs and everyday creators. We explore,
              test, and share the best AI tools that can help you work smarter,
              create faster, and stay ahead in this fast-changing digital era.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4 text-justify">
              Our Mission
            </h2>
            <p className="text-muted-foreground ">
              To make the power of AI accessible to everyone, bridging
              knowledge, tools, and innovation for creators, professionals, and
              learners alike. At{" "}
              <span className="text-primary">{siteConfig.name}</span>, we aim to
              simplify AI, inspire creativity, and empower individuals to work
              smarter, build faster, and stay future-ready in the evolving
              digital world.
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
              <a
                href="/contact"
                className="text-primary font-semibold underline"
              >
                Contact page
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
