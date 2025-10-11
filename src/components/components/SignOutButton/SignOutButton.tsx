// /components/SignOutButton.tsx

import { logOut } from '@/lib/actions';

export function SignOutButton() {
  return (
    <form action={logOut}>
      <button
        type="submit"
        className={'text-red-300 hover:text-red-400 text-3xl my-4 transition duration-200 erase-in-out cursor-pointer'}
      >
        Cerrar Sesión
      </button>
    </form>
  );
}

// <Link href={href} className={`w-sm text-center text-7xl text-neutral-400 p-4 my-${my??5} hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition duration-500 ease-in-out`}>
