"use client"
import { usePathname } from "next/navigation"

export default function HorizontalAdComponent({ src, redirectTo }) {
  const pathname = usePathname()
  if (pathname !== "/") return null

  const handleClick = () => redirectTo && window.open(redirectTo, "_blank")

  return (
    <div className="w-full flex justify-center py-4">
      <div
        className="relative w-[728px] max-w-full mx-4 aspect-[728/160] bg-card border border-border rounded-lg overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        {src.endsWith(".webm") ? (
          <video
            className="absolute inset-0 w-full h-full object-contain"
            src={src}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={src}
            alt="Advertisement"
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  )
}

// 728 px wide × 160 px tall
