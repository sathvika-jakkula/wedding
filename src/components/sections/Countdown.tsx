"use client";

import { useState, useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/utils/gsap";
import SectionTeaser from "@/components/effects/SectionTeaser";

export default function Countdown() {
  const containerRef = useRef<HTMLDivElement>(null);

  const calculateTimeLeft = () => {
    const difference = +new Date("2026-06-25T08:38:00") - +new Date();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  useEffect(() => {
    const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearTimeout(timer);
  });

  useGSAP(() => {
    gsap.fromTo(".countdown-box",
      { opacity: 0, scale: 0.7, filter: "blur(8px)" },
      {
        opacity: 1, scale: 1, filter: "blur(0px)",
        duration: 1.2, stagger: 0.14, ease: "back.out(1.7)",
        scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
        onComplete: () => {
          gsap.to(".countdown-ring", {
            boxShadow: "0 0 50px rgba(107,168,122,0.4), 0 0 100px rgba(107,168,122,0.12)",
            scale: 1.05, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut",
          });
        },
      }
    );
    gsap.fromTo(".countdown-heading",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 76%" } }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-36 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f5f0e8 0%, #f8faf6 50%, #f0f5f1 100%)" }}>

      {/* Blurred photo background */}
      <div className="absolute inset-0 opacity-[0.08] bg-[url('/romantic_lights_2.jpeg')] bg-cover bg-center pointer-events-none"
        style={{ filter: "blur(4px)" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#f5f0e8]/92 via-[#f8faf6]/88 to-[#f0f5f1]/92 pointer-events-none" />

      {/* Warm + sage dual glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-gold/8 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-sage/6 blur-[80px] pointer-events-none" />

      {/* Chapter label */}
      <div className="absolute top-8 right-8 font-sans text-[9px] tracking-[0.45em] text-sage/25 uppercase">
        Chapter 07
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="countdown-heading mb-16">
          <p className="font-sans text-[9px] tracking-[0.6em] text-sage/45 uppercase mb-3">Every second matters</p>
          <h2 className="shimmer-text font-serif text-4xl md:text-6xl mb-3">The Countdown Begins</h2>
          <div className="mt-5 mx-auto flex items-center justify-center gap-3">
            <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-gold/35" />
            <div className="w-1 h-1 rounded-full bg-sage/40" />
            <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-gold/35" />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-14">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="countdown-box flex flex-col items-center">
              <div className="relative mb-5">
                {/* Outer decorative ring */}
                <div className="absolute inset-0 rounded-full border border-sage/15" style={{ margin: "-8px" }} />
                <div className="countdown-ring w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-sage/30 flex items-center justify-center backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.7)" }}>
                  <span className="font-serif text-4xl md:text-5xl text-[#1a3020]">
                    {value.toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
              <span className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#1a3020]/55">
                {unit}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom date reminder */}
        <div className="mt-14 flex items-center justify-center gap-4">
          <div className="w-14 h-[1px] bg-gradient-to-r from-transparent to-sage/30" />
          <p className="font-sans text-[10px] tracking-[0.4em] text-[#1a3020]/40 uppercase">
            June 25, 2026 · 8:38 AM · R.R. Garden's, Godhavarkhani
          </p>
          <div className="w-14 h-[1px] bg-gradient-to-l from-transparent to-sage/30" />
        </div>
      </div>

      <SectionTeaser label="Beautiful memories" fromColor="from-[#f0f5f1]" />
    </section>
  );
}
