"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Copy,
  ArrowLeft,
  Check,
  Twitter,
  Facebook,
  Linkedin,
  Link2,
} from "lucide-react";
import Spinner from "@/components/ui/Spinner";

export default function ViewPromptPage() {
  const router = useRouter();
  const { slug } = useParams();
  const [prompt, setPrompt] = useState(null);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    let ignore = false;
    window.scrollTo({ top: 0, behavior: "smooth" });

    async function fetchPrompt() {
      if (ignore) return;
      const cacheKey = `prompt_${slug}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000;
        if (!isExpired) {
          setPrompt(data);
          return;
        } else {
          localStorage.removeItem(cacheKey);
        }
      }

      const res = await fetch(`/api/prompts?slug=${slug}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setPrompt(data);
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data, timestamp: Date.now() })
        );
      }
    }

    if (slug) fetchPrompt();
    return () => {
      ignore = true;
    };
  }, [slug]);

  if (!prompt)
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Spinner />
      </div>
    );

  const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLinkCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const share = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      `Check out this awesome prompt: ${prompt.title}`
    );
    const links = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    window.open(links[platform], "_blank");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-background/95 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => router.push("/prompts")}
          className="group flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 text-sm font-medium transition"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Prompts
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-8 sm:p-12 border-b border-border/50">
            <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-4 leading-tight">
              {prompt.title}
            </h1>
            {prompt.description && (
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl">
                {prompt.description}
              </p>
            )}
          </div>

          <div className="p-8 sm:p-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Prompt Content
              </h2>
              <button
                onClick={() => handleCopy(prompt.content)}
                className="group flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg border border-primary/20 hover:border-primary/30 transition-all text-sm font-medium"
              >
                {copied ? (
                  <>
                    <Check size={16} className="animate-in zoom-in" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy
                      size={16}
                      className="group-hover:scale-110 transition-transform"
                    />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className="relative bg-muted/30 border border-border/50 rounded-xl p-6 sm:p-8 overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent pointer-events-none" />
              <pre className="relative text-foreground font-mono text-sm sm:text-base leading-relaxed whitespace-pre-wrap wrap-break-word">
                {prompt.content}
              </pre>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-8 space-y-6 text-center"
        >
          <p className="text-muted-foreground text-sm">
            Click the copy button to use this prompt in your projects
          </p>
          <p className="text-foreground font-semibold text-base">
            Share this prompt
          </p>
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => share("twitter")}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 border border-[#1DA1F2]/20 hover:border-[#1DA1F2]/40 transition"
            >
              <Twitter size={20} className="text-[#1DA1F2]" />
            </button>
            <button
              onClick={() => share("facebook")}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 border border-[#1877F2]/20 hover:border-[#1877F2]/40 transition"
            >
              <Facebook size={20} className="text-[#1877F2]" />
            </button>
            <button
              onClick={() => share("linkedin")}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/20 hover:border-[#0A66C2]/40 transition"
            >
              <Linkedin size={20} className="text-[#0A66C2]" />
            </button>
            <div className="w-px h-8 bg-border" />
            <button
              onClick={handleLinkCopy}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 transition"
            >
              {linkCopied ? (
                <Check size={20} className="text-primary animate-in zoom-in" />
              ) : (
                <Link2 size={20} className="text-primary" />
              )}
            </button>
          </div>
          {linkCopied && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary text-sm font-medium"
            >
              Link copied to clipboard!
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
