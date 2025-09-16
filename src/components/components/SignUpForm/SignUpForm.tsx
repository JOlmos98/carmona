// "use client";

// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import toast from "react-hot-toast";
// import { useTranslations } from "next-intl";
// import { signUpSchema } from "@/zod/signUpSchema";
// import { Link } from "@/i18n/navigation";
// import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
// import { useState } from "react";

// export const SignUpForm = () => {

//   const t = useTranslations("SignUp");
//   // const f = useTranslations("Footer");

//   const form = useForm<z.infer<typeof signUpSchema>>({
//     resolver: zodResolver(signUpSchema),
//     defaultValues: {
//       name: "",
//       last_name: "",
//       email: "",
//       password: "",
//       phone: "",
//       bio: "",
//       website: "",
//       subscribe: false,
//     },
//   });

//   const prefixes = [
//     "+0", "+1", "+7", "+31", "+32", "+33", "+34", "+39", "+41", "+44",
//     "+49", "+52", "+54", "+55", "+57", "+61", "+81", "+82", "+86", "+91",
//     "+352", "+353", "+591"
//   ];

//   const [prefix, setPrefix] = useState(prefixes[0]);

//   const { register, handleSubmit, formState: { errors }, reset } = form;

//   const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
//     try {

//       //Lógica de phone
//       const processedValues = { ...values };

//       if (processedValues.phone !== undefined && processedValues.phone.trim() !== "") {
//         processedValues.phone = `${prefix} ${processedValues.phone.trim()}`;
//       } else { processedValues.phone = ""; }

//       if (processedValues.website !== undefined && processedValues.website.trim() !== "") {
//         processedValues.website = `${processedValues.website.trim()}`;
//       } else { processedValues.website = ""; }

//       const res = await fetch("/api/signUp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(processedValues),
//       });

//       if (res.status === 409) toast.error(t("Error already registered"));
//       else if (!res.ok) throw new Error("Signup failed");
//       else {

//         //Lógica de newsletter check
//         if (values.subscribe) {
//           try {
//             const newsletterRes = await fetch("/api/newsletter", {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({ email: values.email }),
//             });

//             if (newsletterRes.status === 409) { //Si ya está suscrito.
//               // toast(f("Error already subscribed"));
//               console.warn("Already subscribed");
//             } else if (!newsletterRes.ok) {
//               console.warn("Newsletter failed", await newsletterRes.text());
//               // toast.error(t("Newsletter subscription failed")); 
//             } else {
//               // toast.success(t("Newsletter subscription successful"));
//             }
//           } catch (err) {
//             console.warn(err);
//             // toast.error(t("Newsletter subscription failed"));
//           }
//         }

//         toast.success((t("Registered successfully") + " " + values.email), { duration: 5000 });
//         reset();
//       }
//     } catch (e) {

//       toast.error(t("Error during registration"));
//       console.error(e);
//     }
//   };

//   return (
//     <div className=" p-6 m-6 rounded-2xl max-w-4xl w-auto mx-auto">
//       <h2 className="text-xl font-bold mb-4">
//         {t("Create your")}{" "}
//         <span className="text-blue-cyan dark:text-blue-cyan font-bold">
//           {t("account")}
//         </span>
//       </h2>

//       <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
//         <div>
//           <input
//             type="text"
//             placeholder={t("Name")}
//             className="w-[315px] lg:w-[600px] text-blue-cyan dark:text-blue-cyan border-zinc-300 dark:border-[#121212] bg-white dark:bg-[#121212] px-4 py-2 rounded-2xl"
//             {...register("name")}
//           />
//           {errors.name && <p className="text-red-500 text-sm mt-1">{t("ErrorNameMin")}</p>}
//         </div>

//         <div>
//           <input
//             type="text"
//             placeholder={t("Last Name")}
//             className="w-[315px] lg:w-[600px] text-blue-cyan dark:text-blue-cyan border-zinc-300 dark:border-[#121212] bg-white dark:bg-[#121212] px-4 py-2 rounded-2xl"
//             {...register("last_name")}
//           />
//           {errors.last_name && <p className="text-red-500 text-sm mt-1">{t("ErrorLastNameMin")}</p>}
//         </div>

//         <div>
//           <input
//             type="email"
//             placeholder={t("Email")}
//             className="w-[315px] lg:w-[600px] text-blue-cyan dark:text-blue-cyan border-zinc-300 dark:border-[#121212] bg-white dark:bg-[#121212] px-4 py-2 rounded-2xl"
//             {...register("email")}
//           />
//           {errors.email && <p className="text-red-500 text-sm mt-1">{t("ErrorEmailInvalid")}</p>}
//         </div>

//         <div>
//           <input
//             type="password"
//             placeholder={t("Password")}
//             className="w-[315px] lg:w-[600px] text-blue-cyan dark:text-blue-cyan border-zinc-300 dark:border-[#121212] bg-white dark:bg-[#121212] px-4 py-2 rounded-2xl"
//             {...register("password")}
//           />
//           {errors.password && <p className="text-red-500 text-sm mt-1">{t("ErrorPasswordMin")}</p>}
//         </div>
//         <div>
//           <div className="flex lg:w-[600px]">
//             <Listbox value={prefix} onChange={setPrefix}>
//               <div className="relative w-[100px]">
//                 <ListboxButton className="w-full h-full px-4 py-2 text-blue-cyan dark:text-blue-cyan rounded-l-2xl bg-white dark:bg-[#121212] border border-zinc-300 dark:border-[#121212]">
//                   {prefix}
//                 </ListboxButton>
//                 <ListboxOptions className="absolute mt-1 max-h-40 overflow-auto w-full rounded-md bg-white dark:bg-[#121212] shadow-lg z-10">
//                   {prefixes.map((p, idx) => (
//                     <ListboxOption
//                       key={idx}
//                       value={p}
//                       className={({ active }) =>
//                         `cursor-pointer px-4 py-2 ${active ? 'bg-blue-100 text-black dark:bg-blue-cyan' : ''
//                         }`
//                       }
//                     >
//                       {p}
//                     </ListboxOption>
//                   ))}
//                 </ListboxOptions>
//               </div>
//             </Listbox>

//             <input
//               type="tel"
//               placeholder={t("Phone")}
//               className="w-full px-4 py-2 text-blue-cyan dark:text-blue-cyan border-zinc-300 dark:border-[#121212] bg-white dark:bg-[#121212] rounded-r-2xl border border-l-0 "
//               {...register("phone")}
//             />
//           </div>

//           {errors.phone && (
//             <p className="text-red-500 text-sm mt-1">{t("ErrorPhoneMin")}</p>
//           )}
//         </div>

//         <div>
//           <textarea
//             placeholder={t("Bio")}
//             className="w-[315px] lg:w-[600px] text-blue-cyan dark:text-blue-cyan border-zinc-300 dark:border-[#121212] bg-white dark:bg-[#121212] px-4 py-2 rounded-2xl min-h-[100px]"
//             {...register("bio")}
//           />
//           {errors.bio && <p className="text-red-500 text-sm mt-1">{t("ErrorBioMax")}</p>}
//         </div>

//         <div>
//           <input
//             type="url"
//             placeholder={t("Website")}
//             className="w-[315px] lg:w-[600px] text-blue-cyan dark:text-blue-cyan border-zinc-300 dark:border-[#121212] bg-white dark:bg-[#121212] px-4 py-2 rounded-2xl"
//             {...register("website")}
//           />
//           {errors.website && <p className="text-red-500 text-sm mt-1">{t("ErrorWebsiteUrl")}</p>}
//         </div>

//         <div className="flex items-start gap-2">
//           <input
//             type="checkbox"
//             {...register("subscribe")}
//             className="mt-1"
//             id="subscribe"
//           />
//           <label htmlFor="subscribe" className="text-sm text-zinc-700 dark:text-zinc-300">
//             {t("newsletterSubscription")}
//           </label>
//         </div>

//         <button
//           type="submit"
//           className="bg-cyan-600 hover:bg-blue-cyan transition text-white font-bold py-2 px-4 rounded-2xl w-full"
//         >
//           {t("Register")}
//         </button>
//         <p className="text-gray-400">{t("Already have an account?")} <Link href="/login" className="text-blue-cyan dark:text-blue-cyan hover:text-red-400 transition font-bold">{t("Login")}</Link></p>
//       </form>
//     </div>
//   );
// };