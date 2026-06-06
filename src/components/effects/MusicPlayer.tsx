"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/bg_music.mp3");
    audio.loop = true;
    audio.volume = 0.35; // Gentle ambient level
    audioRef.current = audio;

    const startAudio = () => {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          removeInteractionListeners();
        })
        .catch((err) => {
          console.log("Autoplay blocked by browser policy, waiting for interaction:", err);
        });
    };

    const handleInteraction = () => {
      startAudio();
    };

    const addInteractionListeners = () => {
      window.addEventListener("click", handleInteraction);
      window.addEventListener("touchstart", handleInteraction);
      window.addEventListener("keydown", handleInteraction);
    };

    const removeInteractionListeners = () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    // Initial attempt to play
    startAudio();
    // Add interaction listener backup
    addInteractionListeners();

    return () => {
      removeInteractionListeners();
      audio.pause();
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  return (
    <div className="fixed top-6 right-6 z-[150] flex items-center">
      <button
        onClick={togglePlay}
        className="w-11 h-11 rounded-full border border-gold/45 bg-white/85 backdrop-blur-md flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-500 hover:border-gold hover:scale-105 cursor-pointer text-sage hover:text-gold"
        aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
      >
        {isPlaying ? (
          /* Animated sound wave bars when music is playing */
          <div className="flex items-end gap-[3px] h-3.5 w-5 justify-center">
            <span className="w-[2.5px] bg-[#1a3020] rounded-full animate-bar-1 h-3" />
            <span className="w-[2.5px] bg-[#c6a87c] rounded-full animate-bar-2 h-4" />
            <span className="w-[2.5px] bg-[#1a3020] rounded-full animate-bar-3 h-2" />
            <span className="w-[2.5px] bg-[#c6a87c] rounded-full animate-bar-4 h-3.5" />
          </div>
        ) : (
          /* Muted icon */
          <div className="relative flex items-center justify-center w-5 h-5 text-[#1a3020]/75">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
          </div>
        )}
      </button>

      <style jsx global>{`
        @keyframes bar-1 {
          0%, 100% { height: 4px; }
          50% { height: 14px; }
        }
        @keyframes bar-2 {
          0%, 100% { height: 14px; }
          50% { height: 6px; }
        }
        @keyframes bar-3 {
          0%, 100% { height: 6px; }
          50% { height: 16px; }
        }
        @keyframes bar-4 {
          0%, 100% { height: 10px; }
          50% { height: 4px; }
        }
        .animate-bar-1 { animation: bar-1 0.8s ease-in-out infinite; }
        .animate-bar-2 { animation: bar-2 0.7s ease-in-out infinite; }
        .animate-bar-3 { animation: bar-3 0.9s ease-in-out infinite; }
        .animate-bar-4 { animation: bar-4 0.6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
