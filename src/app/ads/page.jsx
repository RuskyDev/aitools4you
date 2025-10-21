"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdsPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  const advertisingSections = [
    {
      title: "Featured Tool",
      description:
        "Premium placement at the top of key pages for maximum visibility and engagement. Perfect for brand awareness campaigns and featured product launches.",
      image: "/ads/Featured_Advertising_Banner.jpg",
    },
    {
      title: "Left & Right Side Banners",
      description:
        "Sidebar placement providing visibility on both sides of the page. Ensures consistent exposure as users scroll.",
      image: "/ads/Left_Right_Side_Advertising_Banner.jpg",
    },
    {
      title: "Top Center Advertising Banner",
      description:  
        "Central positioning above main content for optimal focus. Best for time-sensitive offers and high-conversion marketing objectives.",
      image: "/ads/Top_Center_Advertising_Banner.jpg",
    },
  ];

  const handleBuyClick = (adType) => {
    router.push(`/ads/buy?ad_type=${encodeURIComponent(adType)}`);
  };

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
          Connect with a highly targeted audience of entrepreneurs, marketers,
          researchers, and businesses actively seeking AI tools. Select the
          option that aligns with your goals.
        </p>
      </div>

      <div className="w-full px-6 mb-10">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
      {/* Ad Display System
      <div className="px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-3xl font-bold mb-6">Ad Display System</h2>

          <div className="text-lg text-muted-foreground mb-4 space-y-2">
            <p>
              Each banner ad displays for 5 seconds before rotating to the next
              advertiser.
            </p>
            <p>
              If no other ad is active, your banner will continue to display
              without interruption.
            </p>
            <p>
              Fixed (Non-Rotating) slots are exclusive placements that do not
              rotate.
            </p>
            <p>These are limited slots, available only if space is open.</p>
            <p>
              To book or check availability, please email us at:{" "}
              <a
                className="text-primary font-semibold"
                href="mailto:contact@aitools4you.ai"
              >
                contact@aitools4you.ai
              </a>
            </p>
          </div>
        </div>
      </div> */}

      {/* Available Ad Slots & Sizes */}
      <div className="px-6">
        <div className="max-w-5xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Available Ad Slots & Sizes
          </h2>
          <table className="w-full table-auto border-collapse text-left mb-6">
            <thead>
              <tr className="bg-gray-100 text-black">
                <th className="px-4 py-2 border">Position</th>
                <th className="px-4 py-2 border">Size (Pixels)</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Visibility</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border">Top Center Banner</td>
                <td className="px-4 py-2 border">728 x 160</td>
                <td className="px-4 py-2 border">Rotating / Fixed</td>
                <td className="px-4 py-2 border">
                  High Visibility (Top of Page)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">Left & Right Banner</td>
                <td className="px-4 py-2 border">600 x 160</td>
                <td className="px-4 py-2 border">Rotating / Fixed</td>
                <td className="px-4 py-2 border">
                  Medium Visibility (Sidebar)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly Advertising Packages */}
      <div className="px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Weekly Advertising Packages
          </h2>

          {/* Rotating Ads */}
          <h3 className="text-2xl font-semibold mb-2">Rotating Ads</h3>
          <h4 className="text-lg text-muted-foreground mb-4">
            Your ad will rotate with other advertisers every 5 seconds, giving
            shared visibility.
          </h4>
          <table className="w-full table-auto border-collapse text-left mb-8">
            <thead>
              <tr className="bg-gray-100 text-black">
                <th className="px-4 py-2 border">Position</th>
                <th className="px-4 py-2 border">Duration</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border">Top Center Banner</td>
                <td className="px-4 py-2 border">1 Week</td>
                <td className="px-4 py-2 border font-bold">$15</td>
                <td className="px-4 py-2 border">
                  Shared visibility with other advertisers
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">Right & Left Side Banners</td>
                <td className="px-4 py-2 border">1 Week</td>
                <td className="px-4 py-2 border font-bold">$80</td>
                <td className="px-4 py-2 border">
                  Exclusive — limited availability. Contact us at
                  contact@aitools4you.ai
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">Featured Tool</td>
                <td className="px-4 py-2 border">1 Week</td>
                <td className="px-4 py-2 border font-bold">$9</td>
                <td className="px-4 py-2 border">
                  Shared visibility with other advertisers
                </td>
              </tr>
            </tbody>
          </table>

          {/* Fixed Ads */}
          <h3 className="text-2xl font-semibold mb-2">Fixed Ads</h3>
          <h4 className="text-lg text-muted-foreground mb-4">
            Your ad will remain in the same position exclusively for the week,
            without rotation.
          </h4>
          <table className="w-full table-auto border-collapse text-left">
            <thead>
              <tr className="bg-gray-100 text-black">
                <th className="px-4 py-2 border">Position</th>
                <th className="px-4 py-2 border">Duration</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border">Top Center Banner</td>
                <td className="px-4 py-2 border">1 Week</td>
                <td className="px-4 py-2 border font-bold">$80</td>
                <td className="px-4 py-2 border">
                  Exclusive — limited availability. Contact us at
                  contact@aitools4you.ai
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">Featured Tool</td>
                <td className="px-4 py-2 border">1 Week</td>
                <td className="px-4 py-2 border font-bold">$80</td>
                <td className="px-4 py-2 border">
                  Exclusive — limited availability. Contact us at
                  contact@aitools4you.ai
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border">Right & Left Side Banners</td>
                <td className="px-4 py-2 border">1 Week</td>
                <td className="px-4 py-2 border font-bold">$80</td>
                <td className="px-4 py-2 border">
                  Exclusive — limited availability. Contact us at
                  contact@aitools4you.ai
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Advertising Sections */}
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
  );
}
