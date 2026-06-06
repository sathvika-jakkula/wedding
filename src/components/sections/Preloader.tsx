"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/utils/gsap";

const TAGLINES = [
  "A love story unfolds…",
  "Two hearts, one forever…",
  "Something magical awaits…",
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [tagline, setTagline] = useState(TAGLINES[0]);

  useEffect(() => {
    let current = 0;
    let taglineIdx = 0;

    const taglineInterval = setInterval(() => {
      taglineIdx = (taglineIdx + 1) % TAGLINES.length;
      if (taglineRef.current) {
        gsap.to(taglineRef.current, {
          opacity: 0, y: -6, duration: 0.3,
          onComplete: () => {
            setTagline(TAGLINES[taglineIdx]);
            gsap.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.4 });
          },
        });
      }
    }, 1300);

    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 5;
      if (current > 100) current = 100;
      setProgress(current);

      if (current === 100) {
        clearInterval(interval);
        clearInterval(taglineInterval);

        const tl = gsap.timeline({ onComplete });
        tl.to(monogramRef.current, { y: -40, opacity: 0, duration: 0.7, ease: "power3.inOut" })
          .to(taglineRef.current, { y: 20, opacity: 0, duration: 0.5, ease: "power2.in" }, "<")
          .to(containerRef.current, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "-=0.2");
      }
    }, 130);

    return () => { clearInterval(interval); clearInterval(taglineInterval); };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f8fffe 0%, #edf7f0 50%, #f5faf6 100%)" }}
    >
      {/* Soft central glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full bg-sage/8 blur-[120px]" />
      </div>

      {/* Corner ornaments */}
      <div className="absolute top-7 left-7 w-10 h-10 border-t border-l border-sage/25" />
      <div className="absolute top-7 right-7 w-10 h-10 border-t border-r border-sage/25" />
      <div className="absolute bottom-7 left-7 w-10 h-10 border-b border-l border-sage/25" />
      <div className="absolute bottom-7 right-7 w-10 h-10 border-b border-r border-sage/25" />

      {/* Thin decorative ring behind monogram */}
      <div className="absolute w-[260px] h-[260px] rounded-full border border-sage/12 pointer-events-none" />
      <div className="absolute w-[310px] h-[310px] rounded-full border border-gold/8 pointer-events-none"
        style={{ borderStyle: "dashed" }} />

      {/* Main content */}
      <div ref={monogramRef} className="relative z-10 flex flex-col items-center gap-5">
        <span className="font-sans text-[9px] tracking-[0.7em] text-sage/45 uppercase">
          Presenting
        </span>

        {/* Monogram — Great Vibes Script Monogram with Moving Shimmer Gradient */}
        <div className="font-script select-none leading-none text-center px-12 py-4 shimmer-text" style={{ fontSize: "clamp(5rem, 15vw, 9.5rem)" }}>
          H &amp; S
        </div>

        {/* Thin ornament line */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-sage/35" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold/45" />
          <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-sage/35" />
        </div>
      </div>

      {/* Tagline + progress */}
      <div className="relative z-10 mt-7 flex flex-col items-center gap-5">
        <div ref={taglineRef} className="font-sans text-sm tracking-[0.2em] text-[#1a3020]/45 italic">
          {tagline}
        </div>

        {/* Progress bar */}
        <div className="w-44 flex flex-col items-center gap-2">
          <div className="w-full h-[1px] bg-sage/12 relative overflow-hidden rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-sage via-gold to-sage transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="font-sans text-[10px] tracking-widest text-[#1a3020]/30">{progress}%</span>
        </div>

        <div className="flex gap-2.5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-sage/30 animate-pulse-glow"
              style={{ animationDelay: `${i * 0.4}s` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
