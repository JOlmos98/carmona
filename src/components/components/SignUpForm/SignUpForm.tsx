'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useState } from 'react';
import { signUpSchema } from '@/zod/signUpSchema';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'; // <-- AÑADE ESTA LÍNEA

export const SignUpForm = () => {
  const t = useTranslations('SignUp');
  const [isLoading, setIsLoading] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { userName: '', email: '', password: '', repeatPassword: '' }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = form;

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);
    try {

      if (!executeRecaptcha) { // <-- AÑADE ESTE BLOQUE
        throw new Error('Recaptcha not ready');
      }
      const recaptchaToken = await executeRecaptcha('signup'); // <-- AÑADE ESTA LÍNEA

      // Preparamos los datos para la API (sin "repeatPassword")
      // const submissionData = { userName: values.userName, email: values.email, password: values.password };
      const submissionData = { // <-- MODIFICA ESTE OBJETO
        userName: values.userName,
        email: values.email,
        password: values.password,
        recaptchaToken
      };

      const res = await fetch('/api/signUp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(submissionData) });

      if (res.status === 409) {
        toast.error(t('Error already registered'));
      } else if (!res.ok) {
        throw new Error('Signup failed');
      } else {
        toast.success(`${t('Registered successfully')} ${values.email}`, { duration: 5000 });
        reset();
      }
    } catch (e) {
      toast.error(t('Error during registration'));
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg space-y-6">
      <h2 className="text-4xl text-center text-neutral-200">
        {t('Create your')} <span className="text-white">{t('account')}</span>
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-4"
      >
        {/* userName */}
        <div className="flex items-center justify-between gap-4">
          <label className="text-neutral-200 text-3xl">Username</label>
          <div className="w-2/3">
            <input
              type="text"
              placeholder={t('Username')}
              className="w-full bg-neutral-800 border border-neutral-600 rounded-md px-3 py-2 text-neutral-200 placeholder:text-neutral-500 focus:ring-2 focus:ring-white focus:border-white outline-none"
              {...register('userName')}
              disabled={isLoading}
            />
            {errors.userName && <p className="text-red-500 mt-1">{t('ErrorNameMin')}</p>}
          </div>
        </div>

        {/* email */}
        <div className="flex items-center justify-between gap-4">
          <label className="text-neutral-200 text-3xl">Email</label>
          <div className="w-2/3">
            <input
              type="email"
              placeholder={t('Email')}
              className="w-full bg-neutral-800 border border-neutral-600 rounded-md px-3 py-2 text-neutral-200 placeholder:text-neutral-500 focus:ring-2 focus:ring-white focus:border-white outline-none"
              {...register('email')}
              disabled={isLoading}
            />
            {errors.email && <p className="text-red-500 mt-1">{t('ErrorEmailInvalid')}</p>}
          </div>
        </div>

        {/* password */}
        <div className="flex items-center justify-between gap-4">
          <label className="text-neutral-200 text-3xl">{t('Password')}</label>
          <div className="w-2/3">
            <input
              type="password"
              placeholder={t('Password')}
              className="w-full bg-neutral-800 border border-neutral-600 rounded-md px-3 py-2 text-neutral-200 placeholder:text-neutral-500 focus:ring-2 focus:ring-white focus:border-white outline-none"
              {...register('password')}
              disabled={isLoading}
            />
            {errors.password && <p className="text-red-500 mt-1">{t('ErrorPasswordMin')}</p>}
          </div>
        </div>

        {/* repeatPassword */}
        <div className="flex items-center justify-between gap-4">
          <label className="text-neutral-200 text-3xl">{t('Repeat')}</label>
          <div className="w-2/3">
            <input
              type="password"
              placeholder={t('Repeat password')}
              className="w-full bg-neutral-800 border border-neutral-600 rounded-md px-3 py-2 text-neutral-200 placeholder:text-neutral-500 focus:ring-2 focus:ring-white focus:border-white outline-none"
              {...register('repeatPassword')}
              disabled={isLoading}
            />
            {errors.repeatPassword && <p className="text-red-500 mt-1">{t('ErrorRepeatPassword')}</p>}
          </div>
        </div>

        <p className="flex justify-center pt-4">
          <button
            type="submit"
            className="text-4xl text-neutral-400 hover:text-white transition rounded-md disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? t('Registering...') : t('Register')}
          </button>
        </p>
      </form>

      <p className="text-md text-center text-neutral-400">
        {t('Already have an account?')}{' '}
        <Link
          href="/login"
          className="text-neutral-300 hover:text-white transition hover:underline"
        >
          {t('Login')}
        </Link>
      </p>
    </div>
  );
};
