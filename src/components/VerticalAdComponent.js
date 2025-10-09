"use client"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function VerticalAdComponent({ position = "left", src }) {
  const pathname = usePathname()
  const [offsetBottom, setOffsetBottom] = useState(0)
  const alignmentClass = position === "left" ? "left-4" : "right-4"

  useEffect(() => {
    if (pathname !== "/") return
    const updateOffset = () => {
      const footer = document.querySelector("footer")
      if (!footer) return
      const rect = footer.getBoundingClientRect()
      const overlap = window.innerHeight - rect.top
      setOffsetBottom(overlap > 0 ? overlap : 0)
    }

    window.addEventListener("scroll", updateOffset)
    window.addEventListener("resize", updateOffset)
    updateOffset()

    return () => {
      window.removeEventListener("scroll", updateOffset)
      window.removeEventListener("resize", updateOffset)
    }
  }, [pathname])

  if (pathname !== "/") return null

  return (
    <div
      className={`fixed ${alignmentClass} z-10 hidden xl:block transition-transform duration-300`}
      style={{
        top: `calc(50% - ${offsetBottom / 2}px)`,
        transform: "translateY(-50%)",
      }}
    >
      <div className="relative w-[160px] aspect-[160/600] bg-card border border-border rounded-lg overflow-hidden">
        <img
          src={src}
          alt="Advertisement"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
    </div>
  )
}

// 160 px wide × 600 px tall
