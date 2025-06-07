"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SalónAnimado() {
  const [frame, setFrame] = useState(0);
  const TOTAL_FRAMES = 9;

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % TOTAL_FRAMES);
    }, 200); // cambia cada 200 ms (~5 fps)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src={`/menu/salon${frame}.png`}
        alt="Fondo"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <Link href={`/`} className="text-8xl border-4 border-neutral-400 text-neutral-400 p-4 my-5 bg-orange-900 hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition duration-500 ease-in-out">INICIAR</Link>
        <Link href={`/`} className="text-8xl border-4 border-neutral-400 text-neutral-400 p-4 my-5 bg-orange-900 hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition duration-500 ease-in-out">FINALES</Link>
        <Link href={`/salir`} className="text-8xl border-4 border-neutral-400 text-neutral-400 p-4 my-5 bg-orange-900 hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition duration-500 ease-in-out">SALIR</Link>
    </div>
    </div>
  );
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      {/* <button onClick={onClick} className="text-5xl border rounded-2xl p-4">SALIR</button> */}

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
     
//      <Image src="/logo.png" alt="Logo" width={100} height={100} />

//     </div>
//   );
// }