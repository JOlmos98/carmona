// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";
// import { useTranslations } from "next-intl";
// import { logInSchema } from "@/zod/logInSchema";
// import { Link } from "@/i18n/navigation";

// export const LogInForm = () => {

//   const t = useTranslations("LogIn");
//   const f = useTranslations("SignUp");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const form = useForm<z.infer<typeof logInSchema>>({
//     resolver: zodResolver(logInSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const { register, handleSubmit, formState: { errors } } = form;

//   const onSubmit = async (values: z.infer<typeof logInSchema>) => {
//     try {
//       setIsLoading(true);

//       const res = await signIn("credentials", {
//         email: values.email,
//         password: values.password,
//         redirect: false,
//       });

//       if (res?.ok) {
//         toast.success(t("Login successful"));
//         router.push("/dashboard");
//         router.refresh(); // Redundante?
//       } else {
//         toast.error(t("Invalid credentials or email not verified"));
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error(t("An error occurred during login"));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-300 dark:bg-zinc-800 p-6 m-6 rounded-2xl max-w-4xl w-auto mx-auto">
//       <h2 className="text-xl font-bold mb-4">
//         {t("Welcome")}{" "}
//         <span className="text-blue-cyan dark:text-blue-cyan font-bold">
//           {t("log in")}{" "}
//         </span>
//         {t("to continue")}
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
//         <div>
//           <input
//             type="email"
//             placeholder={f("Email")}
//             className="lg:w-[500px] text-blue-cyan dark:text-blue-cyan px-4 py-2 rounded-2xl"
//             {...register("email")}
//             disabled={isLoading}
//           />
//           {errors.email && <p className="text-red-500 text-sm ml-1 mt-1">{t("Error email")}</p>}
//         </div>

//         <div>
//           <input
//             type="password"
//             placeholder={f("Password")}
//             className="lg:w-[500px] text-blue-cyan dark:text-blue-cyan px-4 py-2 rounded-2xl"
//             {...register("password")}
//             disabled={isLoading}
//           />
//           {errors.password && <p className="text-red-500 text-sm ml-1 mt-1">{t("Error password")}</p>}
//         </div>
//         <button
//           type="submit"
//           className="bg-cyan-600 hover:bg-blue-cyan transition text-white font-bold py-2 px-4 rounded-2xl w-full"
//           disabled={isLoading}
//         >
//           {isLoading ? "Loading..." : t("Login")}
//         </button>
//       </form>
//               <p className="text-xs mt-4">{t("Don't have an account?")}{" "}<Link href="/sign-up" className="text-blue-cyan dark:text-blue-cyan hover:text-cyan-300 dark:hover:text-cyan-300">{t("Sign up")}</Link></p>

//     </div>
//   );
// };