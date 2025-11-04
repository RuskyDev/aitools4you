"use client";
import { usePathname } from "next/navigation";

export default function HorizontalAdComponent() {
  const pathname = usePathname();
  if (pathname !== "/" && pathname !== "/prompts") return null;

  const handleClick = () =>
    window.open("https://astrad.io/?utm_source=aitools4you&utm_medium=paid&utm_campaign=aitools4you.ai", "_blank");

  return (
    <div className="w-full flex justify-center py-4">
      <div
        className="relative w-[728px] max-w-full mx-4 aspect-728/160 bg-card border border-border rounded-lg overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://qmxubuxchxlzzzhxvvcc.supabase.co/storage/v1/object/public/Ad%20Banner%20Designs/Top-Side-Ad-15-10-2025.webm"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </div>
  );
}

// 728 px wide × 160 px tall
