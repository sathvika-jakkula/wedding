"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setTimeout(() => setTrail({ x: e.clientX, y: e.clientY }), 80);
    };
    window.addEventListener("mousemove", update);
    return () => window.removeEventListener("mousemove", update);
  }, []);

  return (
    <>
      {/* Outer soft glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 w-20 h-20 rounded-full bg-sage/10 mix-blend-screen blur-[20px]"
        animate={{ x: trail.x - 40, y: trail.y - 40 }}
        transition={{ type: "spring", stiffness: 60, damping: 18, mass: 0.3 }}
      />
      {/* Inner sharp dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 w-4 h-4 rounded-full bg-sage/50 mix-blend-screen blur-[4px]"
        animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.05 }}
      />
    </>
  );
}
