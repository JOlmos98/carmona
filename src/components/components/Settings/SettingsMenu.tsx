'use client';

import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useSettings } from './SettingsContext';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';
import { useSession } from 'next-auth/react';
import { SignOutButton } from '../SignOutButton/SignOutButton';

export function SettingsMenu() {
  const { volume, setVolume, isAudioEnabled, setIsAudioEnabled } = useSettings();
  const session = useSession();

  return (
    // Añadimos un poco de espacio vertical entre cada opción para mejorar la apariencia
    <div className="space-y-4">
      {/* --- Fila del Volumen --- */}
      {/* Usamos flex para poner los elementos en línea, items-center para centrarlos verticalmente */}
      {/* y justify-between para empujar la etiqueta a la izquierda y el slider a la derecha. */}
      <div className="flex items-center justify-between">
        <label className="text-neutral-200 text-3xl">Volumen</label>

        {/* Envolvemos el Slider en un div para controlar su ancho y hacerlo más corto */}
        <div className="w-32">
          {' '}
          {/* Puedes ajustar este ancho (w-32, w-40, etc.) */}
          <Slider
            value={[volume * 100]}
            onValueChange={(value) => setVolume(value[0] / 100)}
            max={100}
            step={1}
          />
        </div>
      </div>

      {/* --- Fila de Activar Sonido --- */}
      {/* Aplicamos el mismo patrón: flex, items-center y justify-between */}
      <div className="flex items-center justify-between">
        <label className="text-neutral-200 text-3xl">Activar Sonido</label>
        <Switch
          className="data-[state=checked]:bg-green-700 data-[state=unchecked]:bg-neutral-700 scale-150"
          checked={isAudioEnabled}
          onCheckedChange={setIsAudioEnabled}
        />
      </div>

      {/* --- Fila del Idioma --- */}
      {/* Y repetimos el patrón una vez más para consistencia */}
      <div className="flex items-center justify-between">
        <label className="text-neutral-200 text-3xl">Idioma</label>
        <LanguageSelector />
      </div>

      {session.status === 'authenticated' && (
        <div className="flex items-center justify-between">
          <SignOutButton />
        </div>
      )}
    </div>
  );
}

// return (
//     <div className="">
//         <div>
//             <label className="text-neutral-200 text-xl">Volumen</label>
//             <Slider
//                 // Tu slider espera un valor entre 0 y 100, pero tu estado va de 0 a 1.
//                 // Hacemos la conversión.
//                 value={[volume * 100]}
//                 onValueChange={(value) => setVolume(value[0] / 100)}
//                 max={100}
//                 step={1}
//             />
//         </div>
//         <div>
//             <label className="text-neutral-200 text-xl">Activar Sonido </label>
//             <Switch
//                 checked={isAudioEnabled}
//                 onCheckedChange={setIsAudioEnabled}
//             />
//         </div>
//         <div>
//             <label className="text-neutral-200 text-xl">Idioma</label>
//             <LanguageSelector />
//         </div>
//     </div>
// );
