"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, useGSAP } from "@/utils/gsap";

export default function CoupleStats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [days, setDays] = useState(0);

  // Calculate days together since a hypothetical date (e.g., Jan 1, 2018)
  useEffect(() => {
    const startDate = new Date("2018-01-01");
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
  }, []);

  useGSAP(() => {
    const counters = gsap.utils.toArray(".stat-number");
    
    counters.forEach((counter: any) => {
      const targetValue = parseFloat(counter.getAttribute("data-value") || "0");
      
      gsap.fromTo(counter, 
        { innerHTML: 0 },
        {
          innerHTML: targetValue,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
          },
          snap: { innerHTML: 1 },
          onUpdate: function() {
             counter.innerHTML = Math.ceil(this.targets()[0].innerHTML).toLocaleString();
          }
        }
      );
    });

    gsap.fromTo(".stat-item",
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

  }, { scope: containerRef, dependencies: [days] }); // re-run if days changes

  return (
    <section ref={containerRef} className="py-24 bg-[#faf9f6] border-y border-gold/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-burgundy-950">
          
          <div className="stat-item flex flex-col items-center">
            <span className="stat-number font-serif text-5xl md:text-6xl text-gold mb-2" data-value={days}>0</span>
            <span className="font-sans text-sm tracking-widest uppercase text-burgundy-900/70">Days Together</span>
          </div>

          <div className="stat-item flex flex-col items-center">
            <span className="stat-number font-serif text-5xl md:text-6xl text-gold mb-2" data-value="1000000">0</span>
            <span className="font-sans text-sm tracking-widest uppercase text-burgundy-900/70">Countless Memories</span>
          </div>

          <div className="stat-item flex flex-col items-center">
            <span className="stat-number font-serif text-5xl md:text-6xl text-gold mb-2" data-value="2">0</span>
            <span className="font-sans text-sm tracking-widest uppercase text-burgundy-900/70">Hearts</span>
          </div>

          <div className="stat-item flex flex-col items-center">
            <span className="stat-number font-serif text-5xl md:text-6xl text-gold mb-2" data-value="1">0</span>
            <span className="font-sans text-sm tracking-widest uppercase text-burgundy-900/70">Soul</span>
          </div>

        </div>
      </div>
    </section>
  );
}
