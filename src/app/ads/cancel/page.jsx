"use client";
import { useState } from "react";
import { XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PaymentCancelPage() {
  const [loading, setLoading] = useState(false);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center px-6 text-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: 15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
          <XCircle className="text-red-500 mb-8" size={80} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl sm:text-6xl font-extrabold mb-6 text-foreground leading-tight"
        >
          Payment <span className="text-red-500">Cancelled</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg sm:text-xl mb-12 max-w-2xl text-muted-foreground"
        >
          Your payment was not completed. You can try again or contact our team for help.
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
              className="flex items-center gap-2 bg-red-500 hover:bg-red-500/90 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
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
