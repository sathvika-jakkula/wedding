"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/utils/gsap";
import { coupleData } from "@/app/constants";

export default function LoveStoryTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const timelineItems = gsap.utils.toArray(".timeline-item");
    const line = document.querySelector(".timeline-line");

    // Animate the vertical line drawing down
    gsap.fromTo(line, 
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        }
      }
    );

    // Animate each item
    timelineItems.forEach((item: any, i) => {
      const isEven = i % 2 === 0;
      
      gsap.fromTo(item,
        { 
          opacity: 0, 
          x: isEven ? -50 : 50,
          y: 50
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 bg-emerald-950/90 text-ivory overflow-hidden">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-20">
          <h2 className="font-serif text-4xl md:text-6xl text-gold mb-4">Our Journey</h2>
          <p className="font-sans text-ivory/70 tracking-widest uppercase text-sm">Every moment led us here</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* The center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 origin-top overflow-hidden">
             <div className="timeline-line w-full h-full bg-gradient-to-b from-transparent via-gold to-transparent" />
          </div>

          <div className="flex flex-col gap-24 md:gap-32">
            {coupleData.story.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`timeline-item relative flex items-center justify-between w-full ${isEven ? 'flex-row-reverse md:flex-row' : 'flex-row-reverse'} max-md:flex-col max-md:gap-8`}>
                  
                  {/* Empty div for layout on desktop */}
                  <div className="hidden md:block w-5/12" />

                  {/* Center Dot */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-950 border border-gold z-10 shadow-[0_0_15px_rgba(212,175,55,0.5)]" />

                  {/* Content */}
                  <div className={`w-full md:w-5/12 flex flex-col ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} items-center text-center`}>
                    <div className="mb-4 text-gold font-serif text-3xl">{item.year}</div>
                    <div className="relative w-full max-w-sm aspect-[4/5] rounded-t-full overflow-hidden border border-gold/20 mb-6">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-serif text-2xl mb-3 text-ivory">{item.title}</h3>
                    <p className="font-sans text-ivory/80 leading-relaxed max-w-sm">
                      {item.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
