// /components/components/ButtonDialog/ButtonDialog.tsx
'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'; // Asegúrate de que la ruta a tus componentes de shadcn sea correcta
import { Separator } from '@/components/ui/separator';

// Definimos la estructura de cada enlace dentro del diálogo
interface UrlItem {
  href: string;
  text: string;
  className?: string;
  action?: () => void;
}

// Definimos las props que recibirá nuestro componente
interface Props {
  buttonText: string;
  dialogTitle: string;
  urlItems?: UrlItem[];
  my?: number;
}

export const ButtonDialog = ({ buttonText, dialogTitle, urlItems, my }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      {/* El disparador del diálogo: nuestro botón con la estética del menú principal */}
      <DialogTrigger asChild>
        <button
          className={`w-sm text-center text-7xl text-neutral-400 p-4 my-${my ?? 5} hover:text-neutral-100 hover:scale-110 transition duration-500 ease-in-out cursor-pointer`}
        >
          {buttonText}
        </button>
      </DialogTrigger>

      {/* El contenido del diálogo: el modal que se abre */}
      <DialogContent className="bg-neutral-900/95 backdrop-blur-md border-neutral-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-4xl text-neutral-200 text-center mb-2">{dialogTitle}</DialogTitle>
        </DialogHeader>
        <Separator className="bg-neutral-600" />

        {/* Contenedor para la lista de enlaces */}
        <div className="flex flex-col items-center justify-center space-y-2 py-2">
          {/* Mapeamos el array de 'items' para crear cada enlace */}

          {urlItems &&
            urlItems.map((urlItem, index) => (
              //   {items.map((item, index) => (

              //! meter en el form una función opcional para que se pueda hacer el logout.

              <form action={urlItem.action ? urlItem.action : ''}>
                {/* <form action={logOut}>
      <button
        type="submit"
        className={'text-red-300 hover:text-red-400 text-3xl my-4 transition duration-200 erase-in-out cursor-pointer'}
      >
        Cerrar Sesión
      </button>
    </form> */}
                {urlItem.action && (
                  <button
                    type="submit"
                    key={index}
                    // href={urlItem.action ? "" : urlItem.href}
                    className={
                      urlItem.className ? urlItem.className : 'w-full text-center text-3xl text-neutral-300 p-2 hover:text-white transition duration-300'
                    }
                    // onClick={() => setIsOpen(false)} // Cierra el diálogo al hacer clic
                  >
                    {urlItem.text}
                  </button>
                )}
                {!urlItem.action && (
                  <Link
                    key={index}
                    href={urlItem.action ? '' : urlItem.href}
                    className={
                      urlItem.className ? urlItem.className : 'w-full text-center text-3xl text-neutral-300 p-2 hover:text-white transition duration-300'
                    }
                    onClick={() => setIsOpen(false)} // Cierra el diálogo al hacer clic
                  >
                    {urlItem.text}
                  </Link>
                )}
              </form>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
