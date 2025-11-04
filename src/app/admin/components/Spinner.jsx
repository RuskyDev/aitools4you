'use client'

import React from "react";
import { motion } from "framer-motion";

export default function Spinner({ size = 8, color = "border-t-primary" }) {
  return (
    <motion.div
      className={`w-${size} h-${size} border-4 border-gray-300 ${color} rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
  );
}
