"use client";

import { useRef } from "react";
import Image from "next/image";

export default function Finale() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative py-28 overflow-hidden bg-beige border-t border-gold/15">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <Image
          src="/finale_bg.png"
          alt="Ending background"
          fill
          className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-beige via-beige/80 to-beige" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
        {/* Elegant circular lockup */}
        <div className="w-24 h-24 rounded-full border border-dashed border-gold/40 flex items-center justify-center mb-8 relative" style={{ animation: "spin 35s linear infinite" }}>
          <div className="absolute font-script text-gold text-4xl transform -rotate-12">H&amp;S</div>
        </div>

        <p className="font-sans tracking-[0.5em] text-sage uppercase text-[10px] mb-4 font-semibold">
          We can't wait to celebrate with you
        </p>

        <h2 className="shimmer-text font-serif text-4xl md:text-5xl mb-8">
          Happily Ever After
        </h2>

        {/* Detailed Invitation Card */}
        <div className="bg-white/75 backdrop-blur-sm border border-gold/20 p-8 rounded-2xl max-w-md w-full shadow-lg mb-10 flex flex-col items-center">
          <p className="font-sans text-[10px] tracking-[0.3em] text-sage font-semibold uppercase mb-3">Wedding Details</p>
          <p className="font-serif text-2xl text-burgundy-950 mb-1">June 25, 2026</p>
          <p className="font-sans text-xs text-burgundy-950/60 mb-5 tracking-wide">Thursday Morning · 8:38 AM onwards</p>
          
          <div className="w-12 h-[1px] bg-gold/30 mb-5" />

          <p className="font-sans text-[10px] tracking-[0.3em] text-sage font-semibold uppercase mb-3">Venue</p>
          <p className="font-serif text-lg text-burgundy-950 mb-1">R.R. Garden's</p>
          <p className="font-sans text-xs text-burgundy-950/60 leading-relaxed max-w-xs mb-6">
            Mathangi Colony, FCI X Road, Godhavarkhani, Ramagundam, Telangana
          </p>

          {/* Google Maps Button */}
          <a
            href="https://maps.google.com/?q=R.R.+Gardens+Godavarikhani"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-gradient-to-r from-sage to-gold hover:from-gold hover:to-sage text-white font-sans text-[10px] tracking-widest uppercase rounded-full shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-0.5"
          >
            Get Directions
          </a>
        </div>

        <div className="w-px h-16 bg-gradient-to-b from-sage/50 to-transparent" />
      </div>
    </section>
  );
}
