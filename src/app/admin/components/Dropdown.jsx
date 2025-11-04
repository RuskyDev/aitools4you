'use client'

import { useState, useRef, useEffect } from "react";

export default function Dropdown({ label, items = [] }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 text-sidebar-foreground hover:text-sidebar-accent-foreground transition"
      >
        {label}
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 rounded shadow-md overflow-hidden bg-sidebar text-sidebar-foreground transition-all duration-200 ease-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ transitionProperty: "max-height, opacity" }}
      >
        <ul className="flex flex-col">
          {items.map((item, idx) => (
            <li key={idx}>
              <button
                onClick={() => {
                  setOpen(false);
                  item.onClick?.();
                }}
                className="w-full text-left px-4 py-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
