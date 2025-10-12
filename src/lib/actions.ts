'use server';

import { signIn, signOut } from '@/backend/auth';

export async function signInWithGoogle() {
  await signIn('google');
}

export async function signInWithGitHub() {
  await signIn('github');
}

export async function logOut() {
  await signOut({ redirectTo: '/' });
}
