"use client"
import { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"

export default function VerticalAdComponent({ position = "left", src, redirectTo }) {
  const pathname = usePathname()
  const [offsetBottom, setOffsetBottom] = useState(0)
  const alignmentClass = position === "left" ? "left-4" : "right-4"
  const rafRef = useRef(null)

  useEffect(() => {
    if (pathname !== "/") return

    const updateOffset = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const footer = document.querySelector("footer")
        if (!footer) return
        const overlap = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top)
        setOffsetBottom(overlap)
      })
    }

    window.addEventListener("scroll", updateOffset)
    window.addEventListener("resize", updateOffset)
    updateOffset()

    return () => {
      window.removeEventListener("scroll", updateOffset)
      window.removeEventListener("resize", updateOffset)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [pathname])

  if (pathname !== "/") return null

  return (
    <div
      className={`fixed ${alignmentClass} z-10 hidden xl:block`}
      style={{
        top: `calc(50% - ${offsetBottom / 2}px)`,
        transform: "translateY(-50%)",
        transition: "transform 0.3s",
      }}
    >
      <div
        className="relative w-[160px] aspect-[160/600] bg-card border border-border rounded-lg overflow-hidden cursor-pointer"
        onClick={() => redirectTo && window.open(redirectTo, "_blank")}
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

// 160 px wide × 600 px tall