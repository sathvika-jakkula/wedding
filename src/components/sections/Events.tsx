"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/utils/gsap";
import { coupleData } from "@/app/constants";
import SectionTeaser from "@/components/effects/SectionTeaser";

export default function Events() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.utils.toArray(".event-card").forEach((card: any) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60, rotation: -1.5, filter: "blur(5px)" },
        {
          opacity: 1, y: 0, rotation: 0, filter: "blur(0px)",
          duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        }
      );
    });
    gsap.fromTo(".events-heading",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 75%" } }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-36 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f9f6f0 0%, #f5f8f4 60%, #f0f5f1 100%)" }}>

      {/* Blurred reception photo for texture */}
      <div className="absolute inset-0 opacity-[0.07] bg-[url('/reception_stage.jpeg')] bg-cover bg-center pointer-events-none"
        style={{ filter: "blur(3px)" }} />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f9f6f0]/95 via-[#f5f8f4]/85 to-[#f0f5f1]/95 pointer-events-none" />

      {/* Decorative ornament top center */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none">
        <svg width="200" height="30" viewBox="0 0 200 30" fill="none">
          <path d="M0 15 Q50 5 100 15 Q150 25 200 15" stroke="#6ba87a" strokeWidth="0.7" strokeOpacity="0.3" fill="none"/>
          <circle cx="100" cy="15" r="3" fill="#c6a87c" fillOpacity="0.4"/>
          <circle cx="50" cy="9" r="1.5" fill="#6ba87a" fillOpacity="0.3"/>
          <circle cx="150" cy="21" r="1.5" fill="#6ba87a" fillOpacity="0.3"/>
          <circle cx="0" cy="15" r="1" fill="#6ba87a" fillOpacity="0.25"/>
          <circle cx="200" cy="15" r="1" fill="#6ba87a" fillOpacity="0.25"/>
        </svg>
      </div>

      {/* Chapter label */}
      <div className="absolute top-8 right-8 font-sans text-[9px] tracking-[0.45em] text-sage/25 uppercase">
        Chapter 06
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="events-heading text-center mb-20">
          <p className="font-sans text-[9px] tracking-[0.6em] text-sage/45 uppercase mb-3">Mark your calendar</p>
          <h2 className="shimmer-text font-serif text-5xl md:text-6xl mb-5">Wedding Itinerary</h2>
          <p className="font-sans text-[#1a3020]/50 tracking-widest uppercase text-xs">Join us in our celebrations</p>
          <div className="mt-5 mx-auto flex items-center justify-center gap-3">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gold/35" />
            <div className="w-1 h-1 rounded-full bg-gold/50" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gold/35" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 max-w-7xl mx-auto">
          {coupleData.events.map((event, index) => (
            <div
              key={index}
              className="event-card group relative p-8 rounded-2xl overflow-hidden flex flex-col items-center text-center shadow-xl hover:-translate-y-3 transition-all duration-500"
              style={{ background: "linear-gradient(145deg, #0e2416 0%, #091a0d 100%)", border: "1px solid rgba(107,168,122,0.18)" }}
            >
              {/* Inner glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at top, rgba(107,168,122,0.12), transparent 70%)" }} />

              {/* Corner ornaments */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-sage/25 rounded-tl-sm" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-sage/25 rounded-tr-sm" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-sage/25 rounded-bl-sm" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-sage/25 rounded-br-sm" />

              {/* Event number */}
              <div className="absolute top-4 right-6 font-sans text-[9px] text-sage/20 tracking-widest z-20">
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Event Image */}
              {event.image && (
                <div className="relative w-full h-36 rounded-xl overflow-hidden mb-6 border border-sage/20 shadow-md group-hover:border-gold/30 transition-colors duration-500 z-10 shrink-0">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Soft dark overlay on image */}
                  <div className="absolute inset-0 bg-[#091a0d]/25 group-hover:bg-[#091a0d]/10 transition-colors duration-500" />
                </div>
              )}

              <div className="text-gold font-sans font-semibold tracking-widest text-sm mb-3 relative z-10">
                {event.date}
              </div>
              <h3 className="font-serif text-2xl mb-4 text-[#e8f5ec] relative z-10 leading-tight">
                {event.title}
              </h3>
              <div className="w-8 h-[1px] bg-sage/30 mb-4 relative z-10" />
              <div className="text-[#e8f5ec]/65 font-sans text-sm mb-6 flex-grow relative z-10 leading-relaxed">
                {event.description}
              </div>
              <div className="mt-auto px-5 py-1.5 border border-sage/30 rounded-full text-sage/80 font-sans text-xs tracking-widest group-hover:bg-sage/10 transition-colors relative z-10">
                {event.time}
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionTeaser label="Time is counting" fromColor="from-[#f0f5f1]" />
    </section>
  );
}
