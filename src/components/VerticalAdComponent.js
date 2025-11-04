"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function VerticalAdComponent() {
  const pathname = usePathname();
  const [offsetBottom, setOffsetBottom] = useState(0);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const src =
    "https://qmxubuxchxlzzzhxvvcc.supabase.co/storage/v1/object/public/Ad%20Banner%20Designs/Python-in-Action-Project-Based-Programming-Left-And-Right-Side-Ad-15-10-2025-_1_.webm";
  const redirect =
    "https://www.amazon.com/Python-Action-Project-Based-Introduction-Applications/dp/B0DJJQR814";

  useEffect(() => {
    if (pathname !== "/" && pathname !== "/prompts" && pathname !== "/blog") return;

    const updateOffset = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;
      const overlap = Math.max(
        0,
        window.innerHeight - footer.getBoundingClientRect().top
      );
      setOffsetBottom(overlap);
    };

    window.addEventListener("scroll", updateOffset);
    window.addEventListener("resize", updateOffset);
    updateOffset();

    return () => {
      window.removeEventListener("scroll", updateOffset);
      window.removeEventListener("resize", updateOffset);
    };
  }, [pathname]);

  useEffect(() => { 
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    let animationFrame;

    const draw = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrame);
  }, [videoRef.current, canvasRef.current]);

  if (pathname !== "/" && pathname !== "/prompts" && pathname !== "/blog") return;

  const handleClick = () => window.open(redirect, "_blank");

  return (
    <>
      {/* Left Ad */}
      <div
        className="fixed left-4 z-10 hidden xl:block"
        style={{
          top: `calc(50% - ${offsetBottom / 2}px)`,
          transform: "translateY(-50%)",
          transition: "transform 0.3s",
        }}
        onClick={handleClick}
      >
        <div className="relative w-40 aspect-160/600 bg-card border border-border rounded-lg overflow-hidden cursor-pointer">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={src}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>

      {/* Right Ad */}
      <div
        className="fixed right-4 z-10 hidden xl:block"
        style={{
          top: `calc(50% - ${offsetBottom / 2}px)`,
          transform: "translateY(-50%)",
          transition: "transform 0.3s",
        }}
        onClick={handleClick}
      >
        <div className="relative w-40 aspect-160/600 bg-card border border-border rounded-lg overflow-hidden cursor-pointer">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
}
