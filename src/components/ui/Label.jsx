"use client";

export default function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-foreground font-semibold mb-2"
    >
      {children}
    </label>
  );
}
