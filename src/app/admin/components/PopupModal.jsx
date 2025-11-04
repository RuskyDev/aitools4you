"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Spinner from "./Spinner";

export default function PopupModal({
  title,
  message,
  isOpen,
  onClose,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  children,
  widthClass = "w-96",
}) {
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!onConfirm) return;
    setProcessing(true);
    try {
      await onConfirm();
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`bg-background rounded-lg p-6 ${widthClass} relative`}>
        {processing && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg">
            <Spinner size={8} color="border-t-primary" />
          </div>
        )}

        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        {message && <p className="text-foreground mb-4">{message}</p>}
        {children}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-border hover:bg-muted transition"
            disabled={processing}
          >
            {cancelText}
          </button>
          {onConfirm && (
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary-foreground hover:text-primary transition"
              disabled={processing}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
