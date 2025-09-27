// /components/SignOutButton.tsx

import { logOut } from "@/lib/actions";

export function SignOutButton() {
    return (
        <form action={logOut}>
            <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Cerrar Sesión
            </button>
        </form>
    );
}