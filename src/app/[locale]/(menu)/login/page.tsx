"use server";

import { Rain } from "@/components/components";
import { LogInForm } from "@/components/components/LogInForm/LogInForm";
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
        <h1 className="text-9xl font-bold mb-16">CARMONA</h1>

        <LogInForm />

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

// "use server";

// import { LogInForm } from "@/components/components/LogInForm/LogInForm";
// // import { LogInForm } from "@/components/log-in-form/LogInForm";
// import { getTranslations } from "next-intl/server";

// export default async function LogInPage() {

//   const t = await getTranslations("LogIn");

//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
//       <div className="flex flex-col row-start-2 items-center sm:items-start mt-2 lg:mt-38">

//         <div className="w-full hidden lg:flex items-center justify-center px-12 mb-5">
//           <p className="text-center text-sm lg:text-7xl font-bold text-zinc-900 dark:text-white leading-tight">{t("Log")}<span className="text-blue-cyan">{t("In")}</span>
//           </p>
//         </div>
//         <div>
//           <LogInForm />
//         </div>
//       </div>
//     </div>
//   );
// }