"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/utils/gsap";

export default function Finale() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
      },
    });

    tl.to(".finale-bg", { scale: 1.1, filter: "brightness(0.55)", ease: "none" })
      .fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: "power2.out" },
        "-=0.5"
      );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      <div className="finale-bg absolute inset-0 w-full h-full">
        <Image
          src="/dramatic_dip.jpeg"
          alt="Grand Finale"
          fill
          className="object-cover opacity-65"
        />
        {/* Green-tinted gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071410] via-[#0a1f12]/50 to-transparent" />
        {/* Subtle sage vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#071410_100%)]" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div ref={textRef} className="flex flex-col items-center">
          <p className="font-sans tracking-[0.45em] text-sage/80 uppercase text-xs mb-6">
            See you there
          </p>
          <h2 className="shimmer-text font-script mb-8"
            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)", lineHeight: 1.3, padding: "0.05em 0.2em" }}>
            Happily Ever After
          </h2>
          <div className="w-px h-20 bg-gradient-to-b from-sage/60 to-transparent" />
          <p className="mt-8 font-sans text-beige/40 tracking-[0.2em] text-xs uppercase">
            June 25, 2026 · 8:38 AM · R.R. Garden's, Godhavarkhani
          </p>
        </div>
      </div>
    </section>
  );
}
