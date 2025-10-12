'use server';

import Image from 'next/image';
import { ButtonMenu, Rain } from '@/components/components';
import { getTranslations } from 'next-intl/server';
import { SignOutButton } from '@/components/components/SignOutButton/SignOutButton';
import { ButtonDialog } from '@/components/components/ButtonDialog/ButtonDialog';
import { logOut } from '@/lib/actions';
// import { ShowOptions } from '../../../components/components/Options/ShowOptions';

export default async function Menu() {
  const t = await getTranslations('Home');

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Image
        width={1920}
        height={1080}
        src={`/menu/home1.png`}
        alt="Fondo"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="relative flex flex-col items-center justify-center h-full text-white z-30">
        <h1 className="text-9xl font-bold mb-6">CARMONA</h1>

        <ButtonMenu
          href={`/`}
          text={t('Play')}
          my={4}
        />
        <ButtonDialog
          buttonText="Leaderboards"
          dialogTitle="Leaderboards"
        />
        <ButtonDialog
          buttonText="Endings"
          dialogTitle="Endings"
        />
        <ButtonDialog
          buttonText="Options"
          dialogTitle="Options"
          urlItems={[
            { href: '/', text: 'FAQs' },
            { href: '/', text: 'Credits' },
            {
              href: '/',
              text: 'Cerrar sesión',
              className: 'text-red-300 hover:text-red-400 text-4xl p-2 transition duration-200 erase-in-out cursor-pointer',
              action: logOut
            }
          ]}
        />

        {/* <ButtonMenu href={`/`} text={t("Leaderboards")} my={4} />
        <ButtonMenu href={`/`} text={t("Endings")} my={4} />
        <ButtonMenu href={`/`} text={t("Options")} my={4} /> */}

        <div>{/* <ShowOptions /> */}</div>
        {/* <ButtonMenu href={`/`} text={t("Options")} my={4} /> // Dentro estará FAQ, Creditos, Cerrar sesión, etc */}

        {/* <ButtonMenu href={`/`} text={`FAQ`} my={3} />
        <ButtonMenu href={`/`} text={t("Credits")} my={3} /> */}
        {/* <ButtonMenu href={`/`} text={t("Credits")} /> */}
        {/* <SignOutButton /> */}
      </div>
      <Rain />
    </div>
  );
}

{
  /* <audio ref={audioRef} loop preload="auto">
        <source src="asset://public/sounds/rain.ogg" type="audio/ogg" />
      </audio> */
}

{
  /* <Link href={`/`} className="w-sm text-center text-8xl border-4 rounded-2xl border-neutral-400 text-neutral-400 p-4 my-5 bg-orange-900 hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition duration-500 ease-in-out">FINALES</Link>
        <Link href={`/settings`} className="w-sm text-center text-8xl border-4 rounded-2xl border-neutral-400 text-neutral-400 p-4 my-5 bg-orange-900 hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition duration-500 ease-in-out">OPCIONES</Link> */
}
{
  /* <Link href={`/quit`} className="w-sm text-center text-8xl border-4 rounded-2xl border-neutral-400 text-neutral-400 p-4 my-5 bg-orange-900 hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition duration-500 ease-in-out">SALIR</Link> */
}
{
  /* <button onClick={() => setIsAudioEnabled(true)}>Activar sonido</button> */
}

// const [frame, setFrame] = useState(0);
// const TOTAL_FRAMES = 9;
// const audioRef = useRef<HTMLAudioElement>(null);

// const {
//     volume, setVolume,
//     fullScreen, setFullScreen,
//     isAudioEnabled, setIsAudioEnabled,
//     language, setLanguage
// } = useSettings();

// const {
//     volume,
//     isAudioEnabled, setIsAudioEnabled,
// } = useSettings();

// useEffect(() => {
//     const interval = setInterval(() => {
//         setFrame((prev) => (prev + 1) % TOTAL_FRAMES);
//     }, 200);
//     return () => clearInterval(interval);
// }, []);

// useEffect(() => {
//   if (!audioRef.current) return;
//   audioRef.current.volume = volume;

//   if (isAudioEnabled) {
//     audioRef.current.play().catch(console.error);
//   } else {
//     audioRef.current.pause();
//   }
// }, [volume, isAudioEnabled]);

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
