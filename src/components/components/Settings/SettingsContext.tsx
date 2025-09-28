"use client";

import { SettingsContextType } from "@/backend/settings";
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
