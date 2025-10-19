"use client";
import { useState, useEffect, useRef } from "react";
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
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const advertisingSections = [
  {
    title: "Featured Advertising Banner",
    description: "Premium top-of-page placement for maximum visibility, engagement, and click-throughs. Your product gets noticed by more visitors.",
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
  const [adBannerDesign, setAdBannerDesign] = useState("design");
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const searchParams = useSearchParams();
  const hcaptchaRef = useRef(null);

  useEffect(() => {
    const adType = decodeURIComponent(searchParams.get("ad_type") || "");
    const match = advertisingSections.find((ad) => ad.title === adType);
    if (match) setSelectedAd(match.title);
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
    if (file.size > 1024 * 1024) {
      setError("File must be less than 1 MB.");
      setImageFile(null);
      return;
    }

    const img = new Image();
    img.onload = () => {
      if (selectedAd === "Left & Right Side Advertising Banner") {
        if (img.width !== 160 || img.height !== 600) {
          setError("Left & Right Side Banner must be exactly 160×600 px.");
          setImageFile(null);
          return;
        }
      } else if (selectedAd === "Top Center Advertising Banner") {
        if (img.width !== 728 || img.height !== 160) {
          setError("Top Center Banner must be exactly 728×160 px.");
          setImageFile(null);
          return;
        }
      }

      setError("");
      setImageFile(file);
    };
    img.onerror = () => {
      setError("Invalid image file.");
      setImageFile(null);
    };
    img.src = URL.createObjectURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!captchaToken) {
      setError("Please complete the hCaptcha challenge.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData(e.target);
      formData.set("adType", selectedAd);
      formData.set("adBannerDesign", adBannerDesign);
      formData.set("hCaptchaToken", captchaToken);

      if (
        adBannerDesign === "upload" &&
        selectedAd !== "Featured Advertising Banner" &&
        imageFile
      ) {
        formData.set("bannerUpload", imageFile);
      }

      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setLoading(false);
        return;
      }
      if (data.url) window.location.href = data.url;
      else {
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
              <Label htmlFor="adType">Select Ad Type</Label>
              <select
                id="adType"
                name="adType"
                value={selectedAd}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedAd(value);
                  setImageFile(null);
                  setError("");
                  setAdBannerDesign(
                    value === "Featured Advertising Banner" ? "none" : "design"
                  );
                }}
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
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                name="name"
                icon={User}
                required
                placeholder="Your name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                icon={Mail}
                required
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                name="productName"
                icon={CheckSquare}
                required
                placeholder="Product name"
              />
            </div>
            <div>
              <Label htmlFor="productUrl">Product URL</Label>
              <Input
                id="productUrl"
                name="productUrl"
                type="url"
                icon={Link2}
                required
                placeholder="https://example.com"
              />
            </div>

            <div>
              <Label htmlFor="productDescription">Product Description</Label>
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

            {selectedAd !== "Featured Advertising Banner" && (
              <div>
                <Label>Ad Banner Design</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setAdBannerDesign("upload")}
                    className={`flex items-center gap-3 border rounded-xl p-4 transition-all ${
                      adBannerDesign === "upload"
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
                    onClick={() => setAdBannerDesign("design")}
                    className={`flex items-center gap-3 border rounded-xl p-4 transition-all ${
                      adBannerDesign === "design"
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
            )}

            {adBannerDesign === "upload" &&
              selectedAd !== "Featured Advertising Banner" && (
                <div>
                  <Label htmlFor="bannerUpload">
                    Upload Your Banner Image (max 300 KB)
                  </Label>
                  <input
                    type="file"
                    id="bannerUpload"
                    name="bannerUpload"
                    accept=".png,.jpg,.jpeg,.gif"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 border border-border bg-input rounded-xl text-muted-foreground shadow-md focus:outline-none focus:ring-2 focus:ring-ring transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-primary-foreground file:cursor-pointer file:hover:bg-primary/90"
                  />
                  {imageFile && (
                    <p className="text-sm text-green-500 mt-2 font-medium">
                      ✅ {imageFile.name} ({(imageFile.size / 1024).toFixed(1)}{" "}
                      KB)
                    </p>
                  )}
                </div>
              )}

            <div>
              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
                onVerify={(token) => setCaptchaToken(token)}
                ref={hcaptchaRef}
              />
            </div>

            <Button type="submit" loading={loading}>
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
            </Button>
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
