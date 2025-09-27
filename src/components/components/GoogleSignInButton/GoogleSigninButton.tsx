
import { signInWithGoogle } from "@/lib/actions"

export function GoogleSignInButton() {
  return (
    <form action={signInWithGoogle}>
      <button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white   py-2 px-4 rounded"
      >
        Continuar con Google
      </button>
    </form>
  )
}