"use client";

import { useEffect, useState, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeOff, ScreenShare, ScreenShareOff } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useSettings } from "@/app/components/SettingsContext";
import Link from "next/link";

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
    if (!audioRef.current) return;

    audioRef.current.volume = volume;

    if (isAudioEnabled) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
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

        <div className="border-4 text-2xl rounded-2xl border-neutral-400 text-neutral-400 p-4 my-5 bg-orange-900">
          {/* Toggle Audio */}
          <div className="w-lg text-center text-5xl my-4">
            <button onClick={toggleAudio} className="flex justify-between items-center w-full">
              <span className="text-left">{isAudioEnabled ? "Audio Activado" : "Audio Desactivado"}</span>
              <span className="text-right">{isAudioEnabled ? <Volume2 className="w-10 h-10" /> : <VolumeOff className="w-10 h-10" />}</span>
            </button>
            {isAudioEnabled && (
              <div className="flex justify-between items-center w-full">
                <label className="text-left text-5xl">Volumen</label>
                <Slider className="w-56" defaultValue={[volume * 100]} max={100} step={1} onValueChange={handleVolumeChange} />
              </div>
            )}
          </div>

          {/* Toggle Pantalla Completa */}
          <div className="w-lg text-center text-2xl my-4">
            <button onClick={toggleFullScreen} className="text-5xl flex justify-between items-center w-full hover:text-neutral-100 hover:border-neutral-100 transition duration-500 ease-in-out">
              <span className="text-left text-5xl">{fullScreen ? "Salir de Pantalla Completa" : "Pantalla Completa"}</span>
              <span className="text-right text-5xl">{fullScreen ? <ScreenShare className="w-10 h-10" /> : <ScreenShareOff className="w-12 h-12" />}</span>
            </button>
          </div>

          {/* Idioma */}
          <div className="w-full my-4">
            <div className="flex justify-between items-center">
              <span className="text-left text-5xl">Idioma</span>
              <select
                className="text-black text-xl rounded-lg px-4 py-2"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>

        <audio ref={audioRef} loop preload="auto">
          <source src="asset://sounds/rain.ogg" type="audio/ogg" />
        </audio>

        <Link href={`/`} className="w-lg text-center text-8xl border-4 rounded-2xl border-neutral-400 text-neutral-400 p-4 my-5 bg-orange-900 hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition duration-500 ease-in-out">
          VOLVER
        </Link>
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState, useRef } from "react";
// import { Slider } from "@/components/ui/slider";
// import { Volume2, VolumeOff, ScreenShare, ScreenShareOff } from "lucide-react";
// import { getCurrentWindow } from "@tauri-apps/api/window";
// import { useSettings } from "@/app/components/SettingsContext";
// import Link from "next/link";
// import { getAudioPath } from "@/lib/getAudioPath";

// export default function Opciones() {

//     const [frame, setFrame] = useState(0);
//     const TOTAL_FRAMES = 9;
//     const audioRef = useRef<HTMLAudioElement>(null);
//     const [audioSrc, setAudioSrc] = useState<string>("");

//     const {
//         volume, setVolume,
//         fullScreen, setFullScreen,
//         isAudioEnabled, setIsAudioEnabled,
//         language, setLanguage
//     } = useSettings();

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setFrame((prev) => (prev + 1) % TOTAL_FRAMES);
//         }, 200);
//         return () => clearInterval(interval);
//     }, []);

//     useEffect(() => {
//         const loadAudio = async () => {
//             const src = await getAudioPath("rain.ogg");
//             setAudioSrc(src);
//         };
//         loadAudio();
//     }, []);

//     useEffect(() => {
//         if (!audioRef.current) return;

//         audioRef.current.volume = volume;

//         if (isAudioEnabled && audioSrc) {
//             audioRef.current.play().catch(console.error);
//         } else {
//             audioRef.current.pause();
//         }
//     }, [volume, isAudioEnabled, audioSrc]);


//     const handleVolumeChange = (value: number[]) => {
//         const newVol = value[0] / 100;
//         setVolume(newVol);
//     };

//     const toggleFullScreen = async () => {
//         const win = getCurrentWindow();
//         const current = await win.isFullscreen();
//         await win.setFullscreen(!current);
//         setFullScreen(!current);
//     };

//     const toggleAudio = () => {
//         setIsAudioEnabled(!isAudioEnabled);
//     };

//     return (
//         <div className="relative w-full h-screen overflow-hidden">
//             <img
//                 src={`/menu/salon${frame}.png`}
//                 alt="Fondo"
//                 className="absolute inset-0 w-full h-full object-cover z-0"
//             />

//             <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-xl space-y-6">

//                 <h1 className="text-8xl font-bold mb-6">OPCIONES</h1>

//                 <div className="border-4 text-2xl rounded-2xl border-neutral-400 text-neutral-400 p-4 my-5 bg-orange-900">
//                     {/* Toggle Audio */}
//                     <div className="w-lg text-center text-5xl my-4">
//                         <button onClick={toggleAudio} className="flex justify-between items-center w-full">
//                             <span className="text-left">{isAudioEnabled ? "Audio Activado" : "Audio Desactivado"}</span>
//                             <span className="text-right">{isAudioEnabled ? <Volume2 className="w-10 h-10" /> : <VolumeOff className="w-10 h-10" />}</span>
//                         </button>
//                         {isAudioEnabled && (
//                             <div className="flex justify-between items-center w-full">
//                                 <label className="text-left text-5xl">Volumen</label>
//                                 <Slider className="w-56" defaultValue={[volume * 100]} max={100} step={1} onValueChange={handleVolumeChange} />
//                             </div>
//                         )}
//                     </div>

//                     {/* Toggle Pantalla Completa */}
//                     <div className="w-lg text-center text-2xl my-4">
//                         <button onClick={toggleFullScreen} className="text-5xl flex justify-between items-center w-full hover:text-neutral-100 hover:border-neutral-100 transition duration-500 ease-in-out">
//                             <span className="text-left text-5xl">{fullScreen ? "Salir de Pantalla Completa" : "Pantalla Completa"}</span>
//                             <span className="text-right text-5xl">{fullScreen ? <ScreenShare className="w-10 h-10" /> : <ScreenShareOff className="w-12 h-12" />}</span>
//                         </button>
//                     </div>

//                     {/* Idioma */}
//                     {/* Idioma */}
//                     <div className="w-full my-4">
//                         <div className="flex justify-between items-center">
//                             <span className="text-left text-5xl">Idioma</span>
//                             <select
//                                 className="text-black text-xl rounded-lg px-4 py-2"
//                                 value={language}
//                                 onChange={(e) => setLanguage(e.target.value)}
//                             >
//                                 <option value="es">Español</option>
//                                 <option value="en">English</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>
//                 <audio ref={audioRef} loop preload="auto">
//                     <source src={audioSrc} type="audio/ogg" />
//                 </audio>

//                 <Link href={`/`} className="w-lg text-center text-8xl border-4 rounded-2xl border-neutral-400 text-neutral-400 p-4 my-5 bg-orange-900 hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition duration-500 ease-in-out">VOLVER</Link>
//             </div>
//         </div>
//     );
// }
