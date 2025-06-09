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
