'use server';

import Image from 'next/image';
import { ButtonMenu, Rain } from '@/components/components';
import { getTranslations } from 'next-intl/server';
import { ButtonDialog } from '@/components/components/ButtonDialog/ButtonDialog';
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
            { href: '/logout', text: 'Cerrar sesión', className: 'text-red-300 hover:text-red-400' }
          ]}
        />

        <div></div>
      </div>
      <Rain />
    </div>
  );
}
