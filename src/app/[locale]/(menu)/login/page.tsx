"use server";

// import { LogInForm } from "@/components/log-in-form/LogInForm";
import { getTranslations } from "next-intl/server";

export default async function LogInPage() {

  const t = await getTranslations("LogIn");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col row-start-2 items-center sm:items-start mt-2 lg:mt-38">

        <div className="w-full hidden lg:flex items-center justify-center px-12 mb-5">
          <p className="text-center text-sm lg:text-7xl font-bold text-zinc-900 dark:text-white leading-tight">{t("Log")}<span className="text-blue-cyan">{t("In")}</span>
          </p>
        </div>
        <div>
          {/* <LogInForm /> */}
        </div>
      </div>
    </div>
  );
}