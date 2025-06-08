"use client";

import { useEffect, useRef, useState } from "react";
import { getCurrentWindow } from '@tauri-apps/api/window';
import { Slider } from "@/components/ui/slider";
import { VolumeOff, Volume2, ScreenShare, ScreenShareOff } from 'lucide-react';

export const AudioScreenConfig = () => {

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    getCurrentWindow()
      .isFullscreen()
      .then(setIsFullScreen)
      .catch(console.error);
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) =>
        console.error("Error al reproducir el audio:", err)
      );
    }
    setIsPlaying(!isPlaying);
  };

  const toggleFullScreen = async () => {
    const window = getCurrentWindow();

    const isCurrentlyFull = await window.isFullscreen();
    await window.setFullscreen(!isCurrentlyFull);
    setIsFullScreen(!isCurrentlyFull);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 p-4 shadow">
      <button
        onClick={toggleAudio}
        className="text-white m-2"
      >
        {isPlaying ? <Volume2 /> : <VolumeOff />}
      </button>
      <button
        onClick={toggleFullScreen}
        className="text-white m-2"
      >
        {isFullScreen ? <ScreenShareOff /> : <ScreenShare />}
      </button>

      {isPlaying ? <Slider
        defaultValue={[volume * 100]}
        max={100}
        step={1}
        onValueChange={handleVolumeChange}
      /> : ""}

      <audio ref={audioRef} loop preload="auto">
        <source src="/sounds/rain.ogg" type="audio/ogg" />
      </audio>
    </div>
  );
}

// "use client";

// import { useEffect, useRef, useState } from "react";

// export default function RainAudio() {
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   const toggleAudio = () => {
//     if (!audioRef.current) return;

//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = 0.01;
//     }
//   }, []);

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       <button
//         onClick={toggleAudio}
//         className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
//       >
//         {isPlaying ? "Detener lluvia" : "Reproducir lluvia"}
//       </button>
//       <audio ref={audioRef} loop preload="auto">
//         <source src="/sounds/rain.ogg" type="audio/ogg" />
//       </audio>
//     </div>
//   );
// }
