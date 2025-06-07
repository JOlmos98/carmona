"use client";

import { useEffect, useRef, useState } from "react";

export default function RainAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.01;
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleAudio}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        {isPlaying ? "Detener lluvia" : "Reproducir lluvia"}
      </button>
      <audio ref={audioRef} loop preload="auto">
        <source src="/sounds/rain.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
