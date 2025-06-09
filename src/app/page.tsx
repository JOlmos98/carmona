"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSettings } from "./components/SettingsContext";
import { getAudioPath } from "@/lib/getAudioPath";

export default function Menu() {

    const [frame, setFrame] = useState(0);
    const TOTAL_FRAMES = 9;
    const audioRef = useRef<HTMLAudioElement>(null);

    // const {
    //     volume, setVolume,
    //     fullScreen, setFullScreen,
    //     isAudioEnabled, setIsAudioEnabled,
    //     language, setLanguage
    // } = useSettings();

    const {
        volume, 
        isAudioEnabled, setIsAudioEnabled,
    } = useSettings();

    useEffect(() => {
        const interval = setInterval(() => {
            setFrame((prev) => (prev + 1) % TOTAL_FRAMES);
        }, 200);
        return () => clearInterval(interval);
    }, []);

  useEffect(() => {
    const loadAudio = async () => {
      if (!audioRef.current) return;
      const src = await getAudioPath("rain.ogg");
      audioRef.current.src = src;
      audioRef.current.volume = volume;

      if (isAudioEnabled) {
        try {
          await audioRef.current.play();
        } catch (err) {
          console.error("Error al reproducir el audio:", err);
        }
      } else {
        audioRef.current.pause();
      }
    };

    loadAudio();
  }, [volume, isAudioEnabled]);

    // useEffect(() => {
    //     if (audioRef.current) {
    //         audioRef.current.volume = volume;
    //         if (isAudioEnabled) {
    //             audioRef.current.play().catch(console.error);
    //         } else {
    //             audioRef.current.pause();
    //         }
    //     }
    // }, [volume, isAudioEnabled]);

  // const [frame, setFrame] = useState(0);
  // const TOTAL_FRAMES = 9;

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setFrame((prev) => (prev + 1) % TOTAL_FRAMES);
  //   }, 200); // cambia cada 200 ms (~5 fps)

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src={`/menu/salon${frame}.png`}
        alt="Fondo"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-8xl font-bold mb-6">CARMONA</h1>

        {/* <AudioScreenConfig/> */}
        <Link href={`/`} className="w-sm text-center text-8xl border-4 rounded-2xl border-neutral-400 text-neutral-400 p-4 my-5 bg-orange-900 hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition duration-500 ease-in-out">INICIAR</Link>
        <Link href={`/`} className="w-sm text-center text-8xl border-4 rounded-2xl border-neutral-400 text-neutral-400 p-4 my-5 bg-orange-900 hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition duration-500 ease-in-out">FINALES</Link>
        <Link href={`/settings`} className="w-sm text-center text-8xl border-4 rounded-2xl border-neutral-400 text-neutral-400 p-4 my-5 bg-orange-900 hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition duration-500 ease-in-out">OPCIONES</Link>
        <Link href={`/quit`} className="w-sm text-center text-8xl border-4 rounded-2xl border-neutral-400 text-neutral-400 p-4 my-5 bg-orange-900 hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition duration-500 ease-in-out">SALIR</Link>
    <button onClick={() => setIsAudioEnabled(true)}>Activar sonido</button>

    </div>
      <audio ref={audioRef} loop preload="auto" />
        {/* <source src="/sounds/rain.ogg" type="audio/ogg" /> */}
        {/* <source src="asset://public/sounds/rain.ogg" type="audio/ogg" />
      </audio> */}
    </div>
  );
}

/* <button onClick={onClick} className="text-5xl border rounded-2xl p-4">SALIR</button> */

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     
//      <Image src="/logo.png" alt="Logo" width={100} height={100} />

//     </div>
//   );
// }