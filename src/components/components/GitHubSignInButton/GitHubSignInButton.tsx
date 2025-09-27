
import { signInWithGitHub } from "@/lib/actions"

export function GitHubSignInButton() {
  return (
    <form action={signInWithGitHub}>
      <button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white   py-2 px-4 rounded"
      >
        Continuar con GitHub
      </button>
    </form>
  )
}