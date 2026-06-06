"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/utils/gsap";
import SectionTeaser from "@/components/effects/SectionTeaser";

const QUOTE = "I have found the one whom my soul loves. A love that feels like returning home after a long journey.";

export default function LoveNotes() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".quote-char",
      { opacity: 0, y: 14 },
      {
        opacity: 1, y: 0, stagger: 0.016, duration: 0.45, ease: "power2.out",
        scrollTrigger: { trigger: ".quote-text", start: "top 82%" },
      }
    );

    gsap.fromTo(".quote-author",
      { opacity: 0, x: -28 },
      {
        opacity: 1, x: 0, duration: 1, delay: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: ".quote-text", start: "top 82%" },
      }
    );

    /* Ambient forest glow */
    gsap.to(".quote-glow", {
      opacity: 0.4, scale: 1.2, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut",
    });

    /* Floating botanical dots */
    gsap.to(".botanix-dot", {
      y: -12, opacity: 0.8, duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.4,
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-44 overflow-hidden bg-[#0b1f12]">
      {/* Deep forest gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,#142b1a,#0b1f12_70%)]" />

      {/* Ambient soft glow */}
      <div className="quote-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-sage/10 blur-[80px] pointer-events-none opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-gold/8 blur-[50px] pointer-events-none" />

      {/* Decorative top/bottom botanical lines */}
      <div className="absolute top-10 left-0 right-0 flex justify-center pointer-events-none">
        <svg width="300" height="20" viewBox="0 0 300 20" fill="none">
          <path d="M0 10 Q75 2 150 10 Q225 18 300 10" stroke="#6ba87a" strokeWidth="0.6" strokeOpacity="0.3" fill="none"/>
          <circle cx="150" cy="10" r="2.5" fill="#c6a87c" fillOpacity="0.4"/>
          <circle cx="75" cy="6" r="1.5" fill="#6ba87a" fillOpacity="0.3"/>
          <circle cx="225" cy="14" r="1.5" fill="#6ba87a" fillOpacity="0.3"/>
        </svg>
      </div>
      <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none scale-y-[-1]">
        <svg width="300" height="20" viewBox="0 0 300 20" fill="none">
          <path d="M0 10 Q75 2 150 10 Q225 18 300 10" stroke="#6ba87a" strokeWidth="0.6" strokeOpacity="0.3" fill="none"/>
          <circle cx="150" cy="10" r="2.5" fill="#c6a87c" fillOpacity="0.4"/>
        </svg>
      </div>

      {/* Floating botanical dots */}
      {[20, 80, 15, 85, 50].map((left, i) => (
        <div key={i} className="botanix-dot absolute pointer-events-none"
          style={{ left: `${left}%`, top: `${20 + i * 15}%` }}>
          <div className="w-1 h-1 rounded-full bg-sage/25" />
        </div>
      ))}

      {/* Chapter label */}
      <div className="absolute top-10 right-10 font-sans text-[9px] tracking-[0.5em] text-sage/25 uppercase">
        Chapter 05
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center max-w-4xl">

        {/* Big opening quote */}
        <div className="font-serif text-[120px] leading-none text-sage/15 mb-[-40px] select-none">
          "
        </div>

        <h3 className="quote-text font-serif text-3xl md:text-5xl leading-[1.5] text-[#e8f5ec] mb-12 italic">
          {QUOTE.split("").map((char, i) => (
            <span key={i} className="quote-char inline-block opacity-0">
              {char === " " ? " " : char}
            </span>
          ))}
        </h3>

        <div className="quote-author flex items-center gap-5 opacity-0">
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-sage/50" />
          <div className="flex flex-col items-center gap-1">
            <p className="font-sans text-sage/70 tracking-[0.4em] uppercase text-[10px] font-semibold">
              Song of Solomon
            </p>
            <div className="flex gap-1.5">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-1 h-1 rounded-full bg-gold/40" />
              ))}
            </div>
          </div>
          <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-sage/50" />
        </div>

      </div>

      <SectionTeaser label="Our celebrations" fromColor="from-[#0b1f12]" />
    </section>
  );
}
