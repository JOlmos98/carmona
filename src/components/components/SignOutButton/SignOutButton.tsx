// /components/SignOutButton.tsx

import { logOut } from "@/lib/actions";

//! DEPRECATED ???

export function SignOutButton() {
    return (
        <form action={logOut}>
            <button type="submit" className={`w-sm text-center text-7xl text-neutral-400 p-4 my-5 hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition duration-500 ease-in-out cursor-pointer`}>
                Cerrar Sesión
            </button>
        </form>
    );
}

// <Link href={href} className={`w-sm text-center text-7xl text-neutral-400 p-4 my-${my??5} hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition duration-500 ease-in-out`}>
