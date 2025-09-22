"use server";

import { Rain } from "@/components/components";
import { SignUpForm } from "@/components/components/SignUpForm/SignUpForm";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function LogInPage() {

  const h = await getTranslations("Home");

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Image
        width={1920}
        height={1080}
        src={`/menu/home1.png`}
        alt="Fondo de Login"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="relative flex flex-col items-center justify-center h-full text-white z-30">
        <h1 className="text-9xl font-bold mb-4">CARMONA</h1>

        <SignUpForm />

        <div className="flex justify-center my-14">
          <Link href="/" className="w-full text-4xl text-neutral-400 hover:text-white">
            {h("Back")}
          </Link>
        </div>
      </div>

      <Rain />
    </div>
  );
}
