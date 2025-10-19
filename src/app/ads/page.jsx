"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdsPage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const router = useRouter()

  const advertisingSections = [
    {
      title: "Featured Advertising Banner",
      description:
        "Premium placement at the top of key pages for maximum visibility and engagement. Perfect for brand awareness campaigns and featured product launches.",
      image: "/ads/Featured_Advertising_Banner.jpg",
    },
    {
      title: "Left & Right Side Advertising Banner",
      description:
        "Dual sidebar placement providing maximum visibility on both sides of the page. Ensures consistent exposure as users scroll.",
      image: "/ads/Left_Right_Side_Advertising_Banner.jpg",
    },
    {
      title: "Top Center Advertising Banner",
      description:
        "Central positioning above main content for optimal focus. Best for time-sensitive offers and high-conversion marketing objectives.",
      image: "/ads/Top_Center_Advertising_Banner.jpg",
    },
  ]

  const handleBuyClick = (adType) => {
    router.push(`/ads/buy?ad_type=${encodeURIComponent(adType)}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <div className="relative w-full h-64 sm:h-96 md:h-[500px]">
              <img
                src={selectedImage}
                alt="Advertising banner preview"
                className="object-contain rounded-lg w-full h-full"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center justify-start px-6 py-16 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-foreground leading-tight">
          Advertise With Us
        </h1>
        <p className="text-lg sm:text-xl mb-12 max-w-3xl text-muted-foreground">
          Connect with a highly targeted audience of entrepreneurs, marketers, researchers, and businesses actively seeking AI tools. Select the option that aligns with your goals.
        </p>
      </div>

      <div className="w-full px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      <div className="px-6 py-16">
        <div className="max-w-5xl mx-auto space-y-16 text-foreground">
          {advertisingSections.map((section, index) => (
            <section
              key={index}
              className="bg-card rounded-lg p-6 sm:p-8 shadow-lg border"
            >
              <h3 className="text-2xl font-bold mb-4 text-center">
                {section.title}
              </h3>
              <p className="text-muted-foreground mb-6 text-center max-w-2xl mx-auto">
                {section.description}
              </p>
              <div className="flex justify-center">
                <div
                  className="cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage(section.image)}
                >
                  <img
                    src={section.image}
                    alt={`${section.title} preview`}
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  onClick={() => handleBuyClick(section.title)}
                >
                  Buy {section.title}
                </button>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
