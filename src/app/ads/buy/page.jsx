"use client";
import { useState, useEffect } from "react";
import {
  Loader2,
  ShoppingBag,
  Mail,
  User,
  Link2,
  Image as ImageIcon,
  CheckSquare,
  FileWarning,
} from "lucide-react";

import { useSearchParams } from "next/navigation";

const advertisingSections = [
  {
    title: "Featured Advertising Banner",
    description:
      "Premium placement at the top of key pages for maximum visibility and engagement.",
    price: "$80 / week",
  },
  {
    title: "Left & Right Side Advertising Banner",
    description:
      "Dual sidebar placement providing maximum visibility on both sides of the page.",
    price: "$80 / week",
  },
  {
    title: "Top Center Advertising Banner",
    description: "Central positioning above main content for optimal focus.",
    price: "$80 / week",
  },
];

export default function BuyAdsPage() {
  const [selectedAd, setSelectedAd] = useState(advertisingSections[0].title);
  const [hasArtwork, setHasArtwork] = useState("no");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const adType = decodeURIComponent(searchParams.get("ad_type") || "");
    if (adType) {
      const match = advertisingSections.find((ad) => ad.title === adType);
      if (match) setSelectedAd(match.title);
    }
  }, [searchParams]);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only PNG, JPEG, JPG, or GIF files are allowed.");
      setImageFile(null);
      return;
    }

    if (file.size > 300 * 1024) {
      setError("File must be less than 300 KB.");
      setImageFile(null);
      return;
    }

    setError("");
    setImageFile(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData(e.target);
      formData.set("adType", selectedAd);
      formData.set("artworkOption", hasArtwork);
      if (imageFile) formData.set("bannerUpload", imageFile);

      const res = await fetch("/api/ads/checkout", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Failed to create checkout session.");
        setLoading(false);
      }
    } catch (err) {
      setError(err.message || "Unexpected error.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="flex flex-col items-center justify-start px-6 py-16 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-foreground leading-tight">
          Buy <span className="text-primary">Advertising</span>
        </h1>
        <p className="text-lg sm:text-xl mb-12 max-w-2xl text-muted-foreground">
          Choose the perfect ad spot to promote your product or service.
        </p>
      </div>

      <div className="w-full px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      <div className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="adType"
                className="block text-foreground font-semibold mb-2"
              >
                Select Ad Type
              </label>
              <select
                id="adType"
                name="adType"
                value={selectedAd}
                onChange={(e) => setSelectedAd(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-input text-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
              >
                {advertisingSections.map((ad) => (
                  <option key={ad.title} value={ad.title}>
                    {ad.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
              {advertisingSections.map(
                (ad) =>
                  ad.title === selectedAd && (
                    <div key={ad.title}>
                      <p className="text-lg font-semibold text-foreground">
                        {ad.title}
                      </p>
                      <p className="text-muted-foreground mt-1">
                        {ad.description}
                      </p>
                      <p className="mt-2 text-primary font-semibold">
                        {ad.price}
                      </p>
                    </div>
                  )
              )}
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-foreground font-semibold mb-2"
              >
                Your Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  maxLength={100}
                  placeholder="Your name"
                  className="w-full pl-12 pr-5 py-3 rounded-xl border border-border bg-input text-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-foreground font-semibold mb-2"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  className="w-full pl-12 pr-5 py-3 rounded-xl border border-border bg-input text-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="productName"
                className="block text-foreground font-semibold mb-2"
              >
                Product Name
              </label>
              <div className="relative">
                <CheckSquare
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  required
                  maxLength={100}
                  placeholder="Product name"
                  className="w-full pl-12 pr-5 py-3 rounded-xl border border-border bg-input text-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="productUrl"
                className="block text-foreground font-semibold mb-2"
              >
                Product URL
              </label>
              <div className="relative">
                <Link2
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={20}
                />
                <input
                  type="url"
                  id="productUrl"
                  name="productUrl"
                  required
                  placeholder="https://example.com"
                  className="w-full pl-12 pr-5 py-3 rounded-xl border border-border bg-input text-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="productDescription"
                className="block text-foreground font-semibold mb-2"
              >
                Product Description
              </label>
              <textarea
                id="productDescription"
                name="productDescription"
                required
                rows={4}
                maxLength={500}
                placeholder="Briefly describe your product or service..."
                className="w-full px-5 py-3 rounded-xl border border-border bg-input text-foreground placeholder:text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition resize-none"
              />
            </div>

            <div>
              <label className="block text-foreground font-semibold mb-3">
                Ad Banner Design
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setHasArtwork("yes")}
                  className={`flex items-center gap-3 border rounded-xl p-4 transition-all ${
                    hasArtwork === "yes"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <ImageIcon size={20} className="text-primary" />
                  <span className="text-foreground font-medium">
                    I’ll upload my own banner
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setHasArtwork("no")}
                  className={`flex items-center gap-3 border rounded-xl p-4 transition-all ${
                    hasArtwork === "no"
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <FileWarning size={20} className="text-primary" />
                  <span className="text-foreground font-medium">
                    I’d like you to design one
                  </span>
                </button>
              </div>
            </div>

            {hasArtwork === "yes" && (
              <div>
                <label
                  htmlFor="bannerUpload"
                  className="block text-foreground font-semibold mb-2"
                >
                  Upload Your Banner Image (max 300 KB)
                </label>
                <input
                  type="file"
                  id="bannerUpload"
                  name="bannerUpload"
                  accept=".png,.jpg,.jpeg,.gif"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-border bg-input rounded-xl text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground file:cursor-pointer file:hover:bg-primary/90"
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2 font-medium">
                    {error}
                  </p>
                )}
                {imageFile && (
                  <p className="text-sm text-green-500 mt-2 font-medium">
                    ✅ {imageFile.name} ({(imageFile.size / 1024).toFixed(1)}{" "}
                    KB)
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Processing...
                </>
              ) : (
                <>
                  Continue
                  <ShoppingBag size={18} />
                </>
              )}
            </button>
            {error && (
              <p className="text-red-500 text-sm text-center font-medium">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
