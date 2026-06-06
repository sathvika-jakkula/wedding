"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/utils/gsap";

const COLORS = ["#6ba87a", "#b8dfc4", "#c6a87c", "#9ecfac", "#d4edd9"];

export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < 50; i++) {
      const isLeaf = i % 4 === 0;
      const particle = document.createElement("div");

      const size = Math.random() * 5 + (isLeaf ? 6 : 2);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${isLeaf ? size * 1.8 : size}px;
        background: ${color};
        opacity: ${Math.random() * 0.35 + 0.1};
        border-radius: ${isLeaf ? "50% 0 50% 0" : "50%"};
        filter: blur(${isLeaf ? 0.5 : 1}px);
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        transform-origin: center center;
      `;

      container.appendChild(particle);

      gsap.to(particle, {
        y: `${-(Math.random() * 120 + 60)}vh`,
        x: `+=${Math.random() * 80 - 40}`,
        rotation: isLeaf ? `+=${Math.random() * 360}` : 0,
        opacity: 0,
        duration: Math.random() * 14 + 10,
        repeat: -1,
        delay: Math.random() * -14,
        ease: "none",
        onRepeat() {
          gsap.set(particle, {
            y: 0,
            x: 0,
            opacity: Math.random() * 0.35 + 0.1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 20 + 80}%`,
          });
        },
      });
    }

    return () => { if (container) container.innerHTML = ""; };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    />
  );
}
