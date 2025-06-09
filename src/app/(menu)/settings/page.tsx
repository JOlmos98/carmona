"use client";

import { useEffect, useState, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeOff, ScreenShare, ScreenShareOff, Languages } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useSettings } from "@/app/components/SettingsContext";

export default function Opciones() {

    const [frame, setFrame] = useState(0);
    const TOTAL_FRAMES = 9;
    const audioRef = useRef<HTMLAudioElement>(null);

    const {
        volume, setVolume,
        fullScreen, setFullScreen,
        isAudioEnabled, setIsAudioEnabled,
        language, setLanguage
    } = useSettings();

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame((prev) => (prev + 1) % TOTAL_FRAMES);
        }, 200);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            if (isAudioEnabled) {
                audioRef.current.play().catch(console.error);
            } else {
                audioRef.current.pause();
            }
        }
    }, [volume, isAudioEnabled]);

    const handleVolumeChange = (value: number[]) => {
        const newVol = value[0] / 100;
        setVolume(newVol);
    };

    const toggleFullScreen = async () => {
        const win = getCurrentWindow();
        const current = await win.isFullscreen();
        await win.setFullscreen(!current);
        setFullScreen(!current);
    };

    const toggleAudio = () => {
        setIsAudioEnabled(!isAudioEnabled);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <img
                src={`/menu/salon${frame}.png`}
                alt="Fondo"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-xl space-y-6">

                <h1 className="text-8xl font-bold mb-6">OPCIONES</h1>

                {/* Toggle Audio */}
                <div className="w-sm text-center text-2xl border-4 rounded-2xl border-neutral-400 text-neutral-400 p-4 my-5 bg-orange-900 hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition duration-500 ease-in-out">
                    <button onClick={toggleAudio} className="flex items-center">
                        {isAudioEnabled ? "Audio Activado" : "Audio Desactivado"}
                        {isAudioEnabled ? <Volume2 /> : <VolumeOff />}
                    </button>
                    {isAudioEnabled && (
                        <div className="w-64">
                            <label>Volumen</label>
                            <Slider className="" defaultValue={[volume * 100]} max={100} step={1} onValueChange={handleVolumeChange} />
                        </div>
                    )}
                </div>

                {/* Toggle Pantalla Completa */}
                <div className="w-sm text-center text-2xl border-4 rounded-lg border-neutral-400 text-neutral-400 p-4 my-5 bg-orange-900">
                    <button onClick={toggleFullScreen} className="flex justify-between items-center w-96 px-5 py-3 bg-orange-900 rounded-xl hover:bg-orange-700 transition">
                        <span className="text-left">{fullScreen ? "Salir de Pantalla Completa" : "Pantalla Completa"}</span>
                        <span className="text-right">{fullScreen ? <ScreenShareOff /> : <ScreenShare />}</span>
                    </button>

                </div>

                {/* Idioma */}
                <div className="flex flex-col items-center">
                    <label className="mb-2 flex items-center gap-2"><Languages /> Idioma</label>
                    <select
                        className="text-black rounded-lg px-4 py-2"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="es">Español</option>
                        <option value="en">English</option>
                    </select>
                </div>

                <audio ref={audioRef} loop preload="auto">
                    <source src="/sounds/menufr.ogg" type="audio/ogg" />
                </audio>
            </div>
        </div>
    );
}
