import { signInWithGoogle } from '@/lib/actions';
import { useTranslations } from 'next-intl';
import { FcGoogle } from 'react-icons/fc';

export function GoogleSignInButton() {
  const t = useTranslations('LogIn');

  return (
    <form action={signInWithGoogle}>
      <button
        type="submit"
        className="w-full text-3xl bg-neutral-600 hover:bg-neutral-700 transition duration-200 text-white py-2 px-4 rounded-xl flex items-center justify-center cursor-pointer"
      >
        <FcGoogle
          size={32}
          className="mr-3"
        />{' '}
        {t('Sign up with Google')}
      </button>
    </form>
  );
}
