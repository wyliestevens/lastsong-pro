"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";

interface Photo {
  src: string;
  alt: string;
  w: number;
  h: number;
  pos?: string;
  fit?: "cover" | "contain";
}

export default function PhotoReel({ photos }: { photos: Photo[] }) {
  const reelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;
    let scrollPos = 0;
    let paused = false;
    const speed = 0.5;

    const step = () => {
      if (!paused && reel) {
        scrollPos += speed;
        const halfWidth = reel.scrollWidth / 2;
        if (scrollPos >= halfWidth) {
          scrollPos = 0;
          reel.scrollLeft = 0;
        }
        reel.scrollLeft = scrollPos;
      }
      animId = requestAnimationFrame(step);
    };

    let animId = requestAnimationFrame(step);

    const handleEnter = () => { paused = true; };
    const handleLeave = () => { paused = false; scrollPos = reel.scrollLeft; };

    reel.addEventListener("mouseenter", handleEnter);
    reel.addEventListener("mouseleave", handleLeave);
    reel.addEventListener("touchstart", handleEnter);
    reel.addEventListener("touchend", handleLeave);

    return () => {
      cancelAnimationFrame(animId);
      reel.removeEventListener("mouseenter", handleEnter);
      reel.removeEventListener("mouseleave", handleLeave);
      reel.removeEventListener("touchstart", handleEnter);
      reel.removeEventListener("touchend", handleLeave);
    };
  }, []);

  const doubled = [...photos, ...photos];

  return (
    <section
      style={{ background: "var(--color-bg-warm)", overflow: "hidden", padding: "0" }}
    >
      <div style={{ maxWidth: "100%", margin: "0 auto" }}>
        <div
          ref={reelRef}
          style={{
            display: "flex",
            gap: "16px",
            paddingBottom: "16px",
            paddingLeft: "24px",
            paddingRight: "24px",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {doubled.map((photo, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: "350px",
                height: "420px",
                borderRadius: "8px",
                overflow: "hidden",
                position: "relative",
                border: "1px solid rgba(212, 160, 65, 0.15)",
                background: "var(--color-bg-card)",
              }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.w}
                height={photo.h}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: photo.fit || "cover",
                  objectPosition: photo.pos || "center center",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
