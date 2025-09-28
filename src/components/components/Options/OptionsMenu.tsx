// "use client";

// import { Slider } from "@/components/ui/slider";
// import { Switch } from "@/components/ui/switch";
// import { LanguageSelector } from "../LanguageSelector/LanguageSelector";
// import { useSettings } from "../Settings/SettingsContext";

// export function OptionsMenu() {

//     // const {
//     //     volume,
//     //     setVolume,
//     //     isAudioEnabled,
//     //     setIsAudioEnabled
//     // } = useSettings();

//     return (
//         // Añadimos un poco de espacio vertical entre cada opción para mejorar la apariencia
//         <div className="space-y-4">

//             {/* --- Fila del Volumen --- */}
//             {/* Usamos flex para poner los elementos en línea, items-center para centrarlos verticalmente */}
//             {/* y justify-between para empujar la etiqueta a la izquierda y el slider a la derecha. */}
//             <div className="flex items-center justify-between">
//                 <label className="text-neutral-200 text-3xl">FAQs</label>
//             </div>
//             {/* Envolvemos el Slider en un div para controlar su ancho y hacerlo más corto */}
//             {/* <div className="w-32">
//                     <Slider
//                         value={[volume * 100]}
//                         onValueChange={(value) => setVolume(value[0] / 100)}
//                         max={100}
//                         step={1}
//                     />
//                 </div> */}

//             {/* --- Fila de Activar Sonido --- */}
//             {/* Aplicamos el mismo patrón: flex, items-center y justify-between */}
//             <div className="flex items-center justify-between">
//                 <label className="text-neutral-200 text-3xl">Creadits</label>
//             </div>
//             {/* <Switch
//                     className="data-[state=checked]:bg-green-700 data-[state=unchecked]:bg-neutral-700 scale-150"
//                     checked={isAudioEnabled}
//                     onCheckedChange={setIsAudioEnabled}
//                 /> */}

//             {/* --- Fila del Idioma --- */}
//             {/* Y repetimos el patrón una vez más para consistencia */}
//             <div className="flex items-center justify-between">
//                 <label className="text-neutral-200 text-3xl">Idioma</label>
//             </div>
//             {/* <LanguageSelector /> */}

//         </div>
//     );

// }
