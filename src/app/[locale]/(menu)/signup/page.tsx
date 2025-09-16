"use server";

// import { SignUpForm } from "@/components/sign-up-form/SignUpForm";
import { getTranslations } from "next-intl/server";

export default async function SignUpPage() {

  const t = await getTranslations("SignUp");

  return (
    <div className="flex min-h-screen w-full font-[family-name:var(--font-geist-sans)]">

      {/*Lado izquierdo*/}
      <div className="w-1/2 hidden lg:flex items-center justify-start px-12">
        <p className="text-left text-4xl lg:text-7xl font-bold text-zinc-900 dark:text-white leading-tight">{t("Sign Up to")}{" "}<span className="text-blue-cyan">{t("All the content")}</span>
        </p>
      </div>

      {/*Lado derecho*/}
      <div className="w-full lg:w-1/2 bg-gray-300 dark:bg-zinc-800 flex items-center justify-center p-8">
        {/* <SignUpForm /> */}
      </div>
    </div>
  );
}


// "use server";

// import { SignUpForm } from "@/components/sing-up-form/SingUpForm";

// export default async function SignUpPage() {

//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
//       <div className="flex flex-col row-start-2 items-center sm:items-start mt-12 lg:mt-38">
//         <div>
//           <div>
//             <SignUpForm />
//           </div>
//         </div>
//       </div>
//     </div>

//   );
// }


{/* <h1 className="text-xl font-bold">{t("Sign Up")}</h1> */ }