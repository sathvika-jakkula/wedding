"use client";

import { useState } from "react";
import Preloader from "@/components/sections/Preloader";
import Hero from "@/components/sections/Hero";
import TheCouple from "@/components/sections/TheCouple";
import MoonlightRomance from "@/components/sections/MoonlightRomance";
import Gallery from "@/components/sections/Gallery";
import LoveNotes from "@/components/sections/LoveNotes";
import Events from "@/components/sections/Events";
import Countdown from "@/components/sections/Countdown";
import MemoryWall from "@/components/sections/MemoryWall";
import Finale from "@/components/sections/Finale";
import Footer from "@/components/sections/Footer";
import CursorGlow from "@/components/effects/CursorGlow";
import FloatingParticles from "@/components/effects/FloatingParticles";
import MusicPlayer from "@/components/effects/MusicPlayer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="relative min-h-screen bg-beige">
      {/* Global Effects */}
      <CursorGlow />
      
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <FloatingParticles />
          <MusicPlayer />
          <Hero />
          <TheCouple />
          <MoonlightRomance />
          <Gallery />
          <LoveNotes />
          <Events />
          <Countdown />
          <MemoryWall />
          <Finale />
          <Footer />
        </>
      )}
    </main>
  );
}
