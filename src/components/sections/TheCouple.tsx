"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/utils/gsap";
import SectionTeaser from "@/components/effects/SectionTeaser";

function LeafCorner({ flip = false }: { flip?: boolean }) {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none"
      className={`absolute text-sage/18 ${flip ? "scale-x-[-1]" : ""}`}>
      <path d="M5 5 Q50 5 50 50" stroke="currentColor" strokeWidth="0.8" fill="none"/>
      <path d="M5 5 Q5 50 50 50" stroke="currentColor" strokeWidth="0.5" fill="none" strokeDasharray="2 4"/>
      <ellipse cx="25" cy="18" rx="10" ry="5" transform="rotate(-30 25 18)" fill="currentColor" fillOpacity="0.6"/>
      <ellipse cx="14" cy="32" rx="9" ry="4" transform="rotate(-60 14 32)" fill="currentColor" fillOpacity="0.4"/>
      <circle cx="5" cy="5" r="2" fill="currentColor" fillOpacity="0.5"/>
      <circle cx="50" cy="50" r="1.5" fill="currentColor" fillOpacity="0.35"/>
    </svg>
  );
}

export default function TheCouple() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".couple-card",
      { opacity: 0, y: 70, filter: "blur(8px)" },
      {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 1.3, stagger: 0.4, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 65%" },
        onComplete: () => {
          gsap.to(".couple-img-container", {
            y: -10, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.6,
          });
          gsap.to(".couple-frame", {
            boxShadow: "0 0 50px rgba(107,168,122,0.25), 0 8px 40px rgba(0,0,0,0.08)",
            duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.5,
          });
        },
      }
    );
    gsap.fromTo(".couple-heading",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 72%" } }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative py-36 overflow-hidden"
      style={{ background: "radial-gradient(ellipse 90% 70% at 50% 55%, #fef9f0 0%, #f5f7ee 45%, #edf4ee 100%)" }}
    >
      {/* Very faint background photo for texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/romantic_lights.jpeg')] bg-cover bg-center pointer-events-none mix-blend-multiply" />

      {/* Decorative glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-gold/6 blur-[100px] pointer-events-none" />

      {/* Botanical corner ornaments */}
      <div className="absolute top-8 left-8"><LeafCorner /></div>
      <div className="absolute top-8 right-8"><LeafCorner flip /></div>
      <div className="absolute bottom-8 left-8 scale-y-[-1]"><LeafCorner /></div>
      <div className="absolute bottom-8 right-8 scale-[-1]"><LeafCorner /></div>

      {/* Chapter label */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 font-sans text-[9px] tracking-[0.5em] text-sage/30 uppercase">
        Chapter 02
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Heading */}
        <div className="couple-heading text-center mb-20">
          <p className="font-sans text-[9px] tracking-[0.6em] text-sage/50 uppercase mb-4">The story of two</p>
          <h2 className="shimmer-text font-serif text-5xl md:text-7xl mb-5">The Couple</h2>
          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gold/40" />
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-sage/40">
              <path d="M10 2 Q14 6 10 10 Q6 14 10 18" stroke="currentColor" strokeWidth="0.8" fill="none"/>
              <circle cx="10" cy="10" r="2" fill="currentColor" fillOpacity="0.5"/>
            </svg>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-gold/40" />
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 max-w-5xl mx-auto">

          {/* Groom */}
          <div className="couple-card flex flex-col items-center text-center w-full md:w-2/5">
            {/* Outer gold-rimmed frame */}
            <div className="couple-img-container p-2 bg-gradient-to-b from-gold/30 via-sage/20 to-gold/10 shadow-[0_15px_35px_rgba(0,0,0,0.1)] mb-7 hover:scale-[1.03] transition-all duration-500"
              style={{ borderRadius: "0 0 138px 138px" }}>
              <div className="couple-frame relative overflow-hidden border border-sage/30 bg-[#050f07]"
                style={{ height: "340px", width: "260px", borderRadius: "0 0 130px 130px" }}>
                <Image src="/groom.jpeg" alt="The Groom" fill className="object-cover object-center transition-transform duration-700 hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a0f]/45 via-transparent to-transparent" />
              </div>
            </div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-6 h-[1px] bg-gold/40" />
              <h3 className="font-script text-5xl text-[#1a3020]" style={{ lineHeight:1.4, padding:"0.05em 0.1em" }}>Shashank</h3>
              <div className="w-6 h-[1px] bg-gold/40" />
            </div>
            <p className="font-sans text-sage/60 tracking-[0.4em] uppercase text-[9px] mb-4">The Groom</p>
            <p className="font-sans text-[#1a3020]/60 leading-relaxed max-w-xs text-sm">
              Kind-hearted and steadfast, Shashank is the anchor and the perfect partner for their beautiful journey ahead.
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:flex flex-col items-center gap-3 shrink-0">
            <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-sage/25 to-transparent" />
            <span className="font-serif text-3xl italic text-gold/50">&amp;</span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-sage/25 to-transparent" />
          </div>

          {/* Bride */}
          <div className="couple-card flex flex-col items-center text-center w-full md:w-2/5">
            {/* Outer gold-rimmed frame */}
            <div className="couple-img-container p-2 rounded-t-full bg-gradient-to-b from-gold/30 via-sage/20 to-gold/10 shadow-[0_15px_35px_rgba(0,0,0,0.1)] mb-7 hover:scale-[1.03] transition-all duration-500">
              <div className="couple-frame relative w-60 h-76 md:w-72 md:h-88 rounded-t-full overflow-hidden border border-sage/30 bg-[#050f07]"
                style={{ height: "340px", width: "260px" }}>
                <Image src="/bride.jpeg" alt="The Bride" fill className="object-cover object-center scale-[1.78] transition-transform duration-700 hover:scale-[1.9]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a0f]/45 via-transparent to-transparent" />
              </div>
            </div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-6 h-[1px] bg-gold/40" />
              <h3 className="font-script text-5xl text-[#1a3020]" style={{ lineHeight:1.4, padding:"0.05em 0.1em" }}>Harinika</h3>
              <div className="w-6 h-[1px] bg-gold/40" />
            </div>
            <p className="font-sans text-sage/60 tracking-[0.4em] uppercase text-[9px] mb-4">The Bride</p>
            <p className="font-sans text-[#1a3020]/60 leading-relaxed max-w-xs text-sm">
              Radiant and full of life, Harinika brings joy and warmth to every moment they share together.
            </p>
          </div>
        </div>


      </div>

      <SectionTeaser label="A moonlit story" fromColor="from-[#edf4ee]" />
    </section>
  );
}
