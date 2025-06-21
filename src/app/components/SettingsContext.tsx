"use client";

import { SettingsContextType } from "@/backend/Settings";
import { createContext, useContext, useState } from "react";

const SettingsContext = createContext<SettingsContextType | null>(null);

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings fuera del proveedor");
  return ctx;
};

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {

  const [volume, setVolume] = useState(1);
  const [fullScreen, setFullScreen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  return (
    <SettingsContext.Provider
      value={{ volume, setVolume, fullScreen, setFullScreen, language, setLanguage, isAudioEnabled, setIsAudioEnabled }}
    >
      {children}
    </SettingsContext.Provider>
  );
};


// // context/AudioContext.tsx
// "use client";

// import { createContext, useContext, useState } from "react";

// interface AudioContextType {
//   enabled: boolean;
//   setEnabled: (value: boolean) => void;
// }

// const AudioContext = createContext<AudioContextType | null>(null);

// export const useAudio = (): AudioContextType => {
//   const context = useContext(AudioContext);
//   if (!context) {
//     throw new Error("useAudio debe usarse dentro de un <AudioProvider>");
//   }
//   return context;
// };

// export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
//   const [enabled, setEnabled] = useState(false);

//   return (
//     <AudioContext.Provider value={{ enabled, setEnabled }}>
//       {children}
//     </AudioContext.Provider>
//   );
// };

// -----------------------------------------------------

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { getCurrentWindow } from '@tauri-apps/api/window';
// import { Slider } from "@/components/ui/slider";
// import { VolumeOff, Volume2, ScreenShare, ScreenShareOff } from 'lucide-react';

// export const AudioScreenConfig = () => {

//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(0);
//   const [isFullScreen, setIsFullScreen] = useState(false);

//   useEffect(() => {
//     getCurrentWindow()
//       .isFullscreen()
//       .then(setIsFullScreen)
//       .catch(console.error);
//   }, []);

//   const toggleAudio = () => {
//     if (!audioRef.current) return;

//     if (isPlaying) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play().catch((err) =>
//         console.error("Error al reproducir el audio:", err)
//       );
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const toggleFullScreen = async () => {
//     const window = getCurrentWindow();

//     const isCurrentlyFull = await window.isFullscreen();
//     await window.setFullscreen(!isCurrentlyFull);
//     setIsFullScreen(!isCurrentlyFull);
//   };

//   const handleVolumeChange = (value: number[]) => {
//     const newVolume = value[0] / 100;
//     setVolume(newVolume);
//     if (audioRef.current) {
//       audioRef.current.volume = newVolume;
//     }
//   };

//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = volume;
//     }
//   }, [volume]);

//   return (
//     <div className="fixed bottom-4 right-4 z-50 space-y-2 p-4 shadow">
//       <button
//         onClick={toggleAudio}
//         className="text-white m-2"
//       >
//         {isPlaying ? <Volume2 /> : <VolumeOff />}
//       </button>
//       <button
//         onClick={toggleFullScreen}
//         className="text-white m-2"
//       >
//         {isFullScreen ? <ScreenShareOff /> : <ScreenShare />}
//       </button>

//       {isPlaying ? <Slider
//         defaultValue={[volume * 100]}
//         max={100}
//         step={1}
//         onValueChange={handleVolumeChange}
//       /> : ""}

//       <audio ref={audioRef} loop preload="auto">
//         <source src="/sounds/rain.ogg" type="audio/ogg" />
//       </audio>
//     </div>
//   );
// }

// -----------------------------------------------------------------------------

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
