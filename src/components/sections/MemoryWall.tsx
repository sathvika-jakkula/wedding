"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/utils/gsap";
import { coupleData } from "@/app/constants";
import SectionTeaser from "@/components/effects/SectionTeaser";

export default function MemoryWall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(marqueeRef.current, {
      xPercent: -50, ease: "none", duration: 26, repeat: -1,
    });
    gsap.fromTo(".memory-heading",
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-20 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f2f5f0 0%, #edf1eb 100%)" }}>
      {/* Diagonal gradient stripe for depth */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(125deg, transparent 60%, rgba(107,168,122,0.05) 100%)" }} />

      {/* Chapter label */}
      <div className="absolute top-8 right-8 font-sans text-[9px] tracking-[0.45em] text-sage/25 uppercase">
        Chapter 08
      </div>

      <div className="memory-heading text-center mb-12 px-4">
        <p className="font-sans text-[9px] tracking-[0.6em] text-sage/40 uppercase mb-3">Reliving every moment</p>
        <h2 className="shimmer-text font-serif text-3xl md:text-5xl mb-2">Beautiful Moments</h2>
        <div className="mt-3 mx-auto flex items-center justify-center gap-3">
          <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-gold/30" />
          <div className="w-1 h-1 rounded-full bg-sage/35" />
          <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-gold/30" />
        </div>
      </div>

      {/* Fade edges on marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #f2f5f0, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #edf1eb, transparent)" }} />

        <div className="relative w-full overflow-hidden flex whitespace-nowrap">
          <div ref={marqueeRef} className="flex gap-5 px-4 w-max">
            {[...coupleData.gallery, ...coupleData.gallery].map((src, index) => (
              <div key={index}
                className="relative w-60 md:w-80 aspect-[4/5] rounded-2xl overflow-hidden inline-block border border-sage/12 hover:border-sage/35 transition-all duration-500 group shadow-md hover:shadow-xl hover:shadow-sage/8">
                <Image src={src} alt="Memory" fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f12]/50 via-transparent to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionTeaser label="The final chapter" fromColor="from-[#edf1eb]" />
    </section>
  );
}
