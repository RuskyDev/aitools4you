"use client";
import { useEffect, useState } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sid = params.get("sid");
    if (!sid) {
      router.push("/");
      return;
    }

    fetch(`/api/billing/verify?sid=${sid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.verified) {
          setVerified(true);
        } else {
          router.push("/");
        }
      })
      .catch(() => router.push("/"))
      .finally(() => setLoading(false));

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [router]);

  if (loading) return null;
  if (!verified) return null;

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-background/80 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center px-6 text-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
          <CheckCircle className="text-primary mb-8" size={80} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl sm:text-6xl font-extrabold mb-6 text-foreground leading-tight"
        >
          Payment <span className="text-primary">Successful!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg sm:text-xl mb-12 max-w-2xl text-muted-foreground"
        >
          Thank you for your purchase! You’ll soon receive a reply from our team
          within the next 24 hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Back to Home
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
