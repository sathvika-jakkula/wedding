"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/utils/gsap";
import { coupleData } from "@/app/constants";
import { AnimatePresence, motion } from "framer-motion";
import SectionTeaser from "@/components/effects/SectionTeaser";

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useGSAP(() => {
    gsap.fromTo(".gallery-img",
      { opacity: 0, scale: 0.85, y: 70, filter: "blur(10px)" },
      {
        opacity: 1, scale: 1, y: 0, filter: "blur(0px)",
        duration: 1.2, stagger: 0.09, ease: "back.out(1.3)",
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
      }
    );

    gsap.utils.toArray(".gallery-img").forEach((img: any, i: number) => {
      gsap.to(img, {
        yPercent: i % 2 === 0 ? 10 : -10,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", end: "bottom top", scrub: true,
        },
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(160deg, #fafaf7 0%, #f5f8f4 50%, #f8faf6 100%)" }}>
      {/* Warm paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.035] bg-[url('/stone_archway.jpeg')] bg-cover bg-center pointer-events-none mix-blend-multiply" />

      {/* Ambient warm glow top-left, cool sage bottom-right */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-gold/6 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-sage/6 blur-[120px] pointer-events-none" />

      {/* Chapter label */}
      <div className="absolute top-8 right-8 font-sans text-[9px] tracking-[0.45em] text-sage/25 uppercase">
        Chapter 04
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="font-sans text-[9px] tracking-[0.6em] text-sage/45 uppercase mb-3">A glimpse of forever</p>
          <h2 className="shimmer-text font-serif text-5xl md:text-6xl mb-5">Captured Memories</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-gold/35" />
            <div className="w-1.5 h-1.5 rounded-full bg-sage/40" />
            <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-gold/35" />
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {coupleData.gallery.map((src, index) => (
            <div
              key={index}
              className="gallery-img relative overflow-hidden rounded-2xl cursor-pointer group break-inside-avoid border border-sage/12 hover:border-sage/35 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-sage/10"
              onClick={() => setSelectedImage(src)}
            >
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#0b1f12]/15 group-hover:bg-transparent transition-colors duration-600 z-10" />
              {/* Image number on hover */}
              <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-400 font-sans text-[9px] tracking-[0.4em] text-mint/80 uppercase bg-[#0b1f12]/50 px-2 py-1 rounded-full">
                {String(index + 1).padStart(2, "0")} / {coupleData.gallery.length}
              </div>
              <Image
                src={src}
                alt={`Gallery Image ${index + 1}`}
                width={800} height={1200}
                className="w-full h-auto object-cover group-hover:scale-[1.06] transition-all duration-700 ease-out grayscale-[60%] group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#091a0d]/96 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[90vh] rounded-xl overflow-hidden shadow-2xl border border-sage/20"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedImage} alt="Enlarged View" width={1920} height={1080}
                className="w-full h-full object-contain bg-black/50" />
              <button
                className="absolute top-4 right-4 text-[#e8f5ec] hover:text-sage transition-colors p-2 bg-[#091a0d]/60 rounded-full border border-sage/20"
                onClick={() => setSelectedImage(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SectionTeaser label="Words from the heart" fromColor="from-[#f5f8f4]" />
    </section>
  );
}
