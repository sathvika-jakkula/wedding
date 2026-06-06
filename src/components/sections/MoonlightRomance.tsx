"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/utils/gsap";
import SectionTeaser from "@/components/effects/SectionTeaser";

export default function MoonlightRomance() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(imageRef.current, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.fromTo(textRef.current,
      { opacity: 0, y: 60, filter: "blur(8px)" },
      {
        opacity: 1, y: 0, filter: "blur(0px)", duration: 1.6, ease: "power3.out",
        scrollTrigger: { trigger: textRef.current, start: "top 80%" },
      }
    );

    /* Slow ambient glow pulse on the moon orb */
    gsap.to(".moon-orb", {
      scale: 1.15,
      opacity: 0.12,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-40 overflow-hidden bg-[#0a1f12]">
      {/* Glowing moon orb */}
      <div className="moon-orb absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-sage/8 blur-[100px] pointer-events-none opacity-8" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-mint/5 blur-[60px] pointer-events-none" />

      {/* Chapter label */}
      <div className="absolute top-8 right-8 font-sans text-[9px] tracking-[0.45em] text-sage/30 uppercase">
        Chapter 03
      </div>

      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16 md:gap-24 relative z-10">

        {/* Image */}
        <div className="w-full md:w-1/2 relative h-[80vh] rounded-3xl overflow-hidden border border-sage/15 shadow-2xl">
          <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
            <Image
              src="/moonlight_walk.jpeg"
              alt="Moonlight Romance"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f12] via-transparent to-transparent" />
          </div>
        </div>

        {/* Text */}
        <div ref={textRef} className="w-full md:w-1/2 flex flex-col items-start text-left">
          <span className="font-sans text-[9px] tracking-[0.5em] text-sage/50 uppercase mb-6">
            Their story
          </span>
          <h2 className="font-serif text-5xl md:text-7xl text-beige mb-8 leading-tight">
            Under the <br />
            <span className="shimmer-text italic">Moonlight</span>
          </h2>
          <p className="font-sans text-lg md:text-xl text-beige/70 leading-relaxed mb-10 max-w-lg">
            "Like the moon illuminating the darkest night, your love brought light into my world.
            In your eyes, I found my home, and in your heart, I found my forever."
          </p>
          <div className="w-20 h-[1px] bg-gradient-to-r from-sage/60 to-transparent" />
        </div>

      </div>

      <SectionTeaser label="Captured moments" fromColor="from-[#0a1f12]" />
    </section>
  );
}
