"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/utils/gsap";
import { coupleData } from "@/app/constants";
import SectionTeaser from "@/components/effects/SectionTeaser";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "entrance" | "playing" | "revealed";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<Phase>("entrance");
  const [videoProgress, setVideoProgress] = useState(0);

  /* ── Parallax on background photo ── */
  useGSAP(
    () => {
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(imageRef.current, {
        scale: 1.06,
        duration: 22,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef },
  );

  /* ── Reveal animation after video ── */
  useEffect(() => {
    if (phase !== "revealed") return;

    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-title-word",
      { opacity: 0, y: 120, filter: "blur(14px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.6,
        stagger: 0.22,
        ease: "power4.out",
      },
    );
    tl.fromTo(
      ".hero-shimmer-line",
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 1.2, ease: "power3.out" },
      "-=1",
    );
    tl.fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 24, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power3.out",
      },
      "-=0.9",
    );
    tl.fromTo(
      ".hero-eyebrow",
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      "-=1",
    );
  }, [phase]);

  /* ── Video progress tracking ── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (video.duration) {
        setVideoProgress(video.currentTime / video.duration);
      }
    };

    const onEnded = () => handleVideoEnd();

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, [phase]);

  const handleOpen = () => {
    setPhase("playing");
    setTimeout(() => {
      videoRef.current?.play();
    }, 600);
  };

  const handleVideoEnd = () => {
    gsap.to(videoRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => setPhase("revealed"),
    });
  };

  const handleSkip = () => {
    videoRef.current?.pause();
    handleVideoEnd();
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[#050f07]"
    >
      {/* ── Background photo (always visible, parallax) ── */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <Image
          src="/dramatic_dip.jpeg"
          alt="Wedding Stage"
          fill
          className="object-cover object-center opacity-45"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050f07] via-[#050f07]/30 to-transparent" />
      </div>

      {/* ── Chapter label ── */}
      <div className="absolute top-8 right-8 z-20 font-sans text-[9px] tracking-[0.45em] text-sage/30 uppercase">
        Chapter 01
      </div>

      {/* ══════════════════════════════════════
          PHASE: ENTRANCE
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {phase === "entrance" && (
          <motion.div
            key="entrance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4"
          >
            {/* Monogram — Great Vibes Script Monogram with Moving Shimmer Gradient */}
            <div
              className="font-script select-none leading-none text-center px-12 py-4 mb-6 shimmer-text"
              style={{ fontSize: "clamp(4.5rem, 12vw, 8.5rem)" }}
            >
              S &amp; H
            </div>

            <p className="font-sans text-[9px] tracking-[0.5em] text-beige/35 uppercase mb-12">
              {coupleData.weddingDate} &nbsp;·&nbsp; {coupleData.weddingTime}
            </p>

            {/* Premium play button with spinning outer ornament */}
            <div
              className="relative group mb-8 cursor-pointer"
              onClick={handleOpen}
            >
              {/* Outer decorative gold ring */}
              <div className="absolute -inset-4 rounded-full border border-gold/20 scale-90 group-hover:scale-110 group-hover:border-gold/40 transition-all duration-700 ease-out pointer-events-none" />
              <div
                className="absolute -inset-2 rounded-full border border-dashed border-sage/35 opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ animation: "spin 25s linear infinite" }}
              />

              <button
                aria-label="Open the invitation video"
                className="relative flex items-center justify-center w-20 h-20 rounded-full border border-beige/30 group-hover:border-gold bg-white/5 group-hover:bg-white/10 backdrop-blur-sm transition-all duration-500 shadow-[0_0_50px_rgba(198,168,124,0.15)] group-hover:shadow-[0_0_60px_rgba(198,168,124,0.35)]"
              >
                <svg
                  width="22"
                  height="24"
                  viewBox="0 0 22 24"
                  fill="none"
                  className="ml-1.5 transition-transform duration-500 group-hover:scale-110"
                >
                  <path
                    d="M2 2L20 12L2 22V2Z"
                    fill="#c6a87c"
                    fillOpacity="0.85"
                    stroke="#c6a87c"
                    strokeWidth="1"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <p className="font-sans text-[11px] tracking-[0.45em] text-beige/50 uppercase mb-1">
              Open the Invitation
            </p>
            <p className="font-sans text-[8px] tracking-wider text-beige/20 max-w-xs text-center">
              {coupleData.location}
            </p>

            {/* Scroll hint */}
            <div className="absolute bottom-10 flex flex-col items-center gap-2">
              <span className="text-[9px] tracking-[0.3em] text-beige/20 uppercase">
                scroll to explore
              </span>
              <div className="w-[1px] h-10 bg-beige/10 overflow-hidden">
                <div className="w-full h-1/2 bg-beige/30 animate-slide-down" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          PHASE: VIDEO PLAYING
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {phase === "playing" && (
          <motion.div
            key="video"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.6, ease: "easeOut" },
            }}
            exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.5 } }}
            className="absolute inset-0 z-20 flex items-center justify-center px-6 md:px-16"
          >
            {/* Semi-transparent backdrop — lets the stage photo and background lights show through */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#050f07]/40 via-[#0a2010]/30 to-[#050f07]/50 backdrop-blur-[2px]"
              onClick={handleSkip}
            />

            {/* Celebration background lights & bokeh */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {/* Pulsing colored ambient glows */}
              <div
                className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gold/15 blur-[120px] animate-pulse-glow"
                style={{ animationDuration: "8s" }}
              />
              <div
                className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-sage/12 blur-[130px] animate-pulse-glow"
                style={{ animationDuration: "10s" }}
              />
              <div
                className="absolute top-[40%] right-[-5%] w-[35%] h-[35%] rounded-full bg-gold/8 blur-[100px] animate-pulse-glow"
                style={{ animationDuration: "12s" }}
              />

              {/* Individual floating bokeh celebration light orbs */}
              <div className="absolute top-[15%] left-[20%] w-16 h-16 rounded-full bg-gold/25 blur-[12px] animate-float-1" />
              <div className="absolute top-[70%] left-[10%] w-24 h-24 rounded-full bg-sage/15 blur-[16px] animate-float-2" />
              <div className="absolute top-[25%] right-[15%] w-20 h-20 rounded-full bg-gold/20 blur-[14px] animate-float-3" />
              <div
                className="absolute bottom-[20%] right-[30%] w-28 h-28 rounded-full bg-sage/20 blur-[20px] animate-float-1"
                style={{ animationDelay: "-3s" }}
              />
              <div
                className="absolute top-[50%] left-[45%] w-12 h-12 rounded-full bg-gold/30 blur-[8px] animate-float-2"
                style={{ animationDelay: "-6s" }}
              />

              {/* Additional tiny golden sparkles */}
              <div className="absolute top-[30%] left-[30%] w-2 h-2 rounded-full bg-gold/60 blur-[1px] animate-pulse" />
              <div
                className="absolute top-[60%] right-[25%] w-3 h-3 rounded-full bg-gold/50 blur-[1px] animate-pulse"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute bottom-[35%] left-[15%] w-2.5 h-2.5 rounded-full bg-gold/40 blur-[1px] animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
            </div>

            {/* Video card */}
            <div className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden border border-sage/20 shadow-[0_0_80px_rgba(0,0,0,0.8),0_0_40px_rgba(107,168,122,0.1)]">
              <video
                ref={videoRef}
                src="/A_cinematic_text_driven_tradi.mp4"
                className="w-full aspect-video object-cover block"
                playsInline
              />

              {/* Bottom controls bar */}
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-10 bg-gradient-to-t from-black/80 to-transparent">
                {/* Progress bar */}
                <div className="w-full h-[2px] bg-white/15 rounded-full overflow-hidden mb-3">
                  <div
                    ref={progressRef}
                    className="h-full bg-gradient-to-r from-sage to-gold rounded-full transition-all duration-300 ease-linear"
                    style={{ width: `${videoProgress * 100}%` }}
                  />
                </div>
              </div>

              {/* Skip button — top right of card */}
              <button
                onClick={handleSkip}
                className="absolute top-4 right-4 z-20 flex items-center gap-1.5 font-sans text-[10px] tracking-[0.3em] text-white/55 hover:text-white/90 uppercase transition-colors duration-300 bg-black/30 hover:bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10"
              >
                <span>Skip</span>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path
                    d="M1 4H10M7 1L10 4L7 7"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          PHASE: REVEALED (invitation text)
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {phase === "revealed" && (
          <motion.div
            key="revealed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.6 } }}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center"
          >
            <div className="hero-eyebrow font-sans text-[9px] tracking-[0.45em] text-sage/70 uppercase mb-6 opacity-0">
              You are warmly invited to witness
            </div>

            {/* Names stacked — script font, viewport-relative so they never clip */}
            <h1 className="flex flex-col items-center mb-4 leading-none">
              <span
                className="hero-title-word font-script shimmer-text opacity-0 block"
                style={{
                  fontSize: "clamp(3rem, 9vw, 7rem)",
                  lineHeight: 1.35,
                  padding: "0.05em 0.35em",
                }}
              >
                Shashank
              </span>

              <div className="hero-title-word opacity-0 flex items-center gap-4 my-0.5">
                <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-gold/35" />
                <span className="font-serif text-lg md:text-xl text-gold/55 italic tracking-[0.2em]">
                  and
                </span>
                <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-gold/35" />
              </div>

              <span
                className="hero-title-word font-script shimmer-text opacity-0 block"
                style={{
                  fontSize: "clamp(3rem, 9vw, 7rem)",
                  lineHeight: 1.35,
                  padding: "0.05em 0.35em",
                }}
              >
                Harnika
              </span>
            </h1>

            <div className="hero-shimmer-line w-56 h-[1px] bg-gradient-to-r from-transparent via-sage/60 to-transparent mb-6" />

            {/* Date · Time · Venue */}
            <div className="hero-subtitle opacity-0 flex flex-col items-center gap-1.5">
              <p className="font-sans text-base md:text-lg text-beige/70 tracking-widest">
                {coupleData.weddingDate}
                <span className="mx-3 text-sage/40">·</span>
                {coupleData.weddingTime}
              </p>
              <p className="font-sans text-xs md:text-sm text-beige/40 tracking-wider max-w-sm text-center">
                {coupleData.locationFull}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scroll indicator (revealed phase) ── */}
      {phase === "revealed" && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <div className="w-[1px] h-12 bg-sage/20 overflow-hidden">
            <div className="w-full h-1/2 bg-sage/50 animate-slide-down" />
          </div>
        </div>
      )}

      <SectionTeaser label="Meet the couple" fromColor="from-[#050f07]" />
    </section>
  );
}
