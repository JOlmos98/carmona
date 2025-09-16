"use server";

import { getTranslations } from "next-intl/server";
import { ButtonMenu } from "@/components/components";
import Image from "next/image";

export default async function NotFoundPage() {

  const t = await getTranslations("Home");

  return (
    <div className="border-indigo-800 flex flex-col md:flex-row items-center justify-center min-h-screen p-8 gap-6 lg:gap-12 font-[family-name:var(--font-geist-sans)]">

      {/* Imagen a la izquierda */}
      <div className="w-2/4 lg:w-1/4 flex justify-center">
        <Image
          className="object-contain rounded-2xl max-w-full h-auto"
          src="https://i.imgur.com/mS3Y1VQ.png"
          alt="not found"
          width={500}
          height={800}
          priority
        />
      </div>

      {/* Texto centrado */}
      <div className="w-full md:w-1/4 flex flex-col items-center text-center" >
        <h1 className="text-3xl lg:text-9xl font-bold text-neutral-200 mb-2 lg:mb-10">404</h1>
        <p className="text-2xl text-neutral-200">
          {t("404")}
        </p>
        <p className="my-8"><ButtonMenu text={"Return"} href={"/"}/></p>
      </div>

    </div>
  );
}


// "use server";

// import Image from "next/image";
// // import { Metadata } from "next";
// // import { getTranslations } from "next-intl/server";

// // export async const metadata: Metadata = {
// //   title: '404 - Página no encontrada',
// //   description: 'Lo sentimos, la página que buscas no existe.',
// // };

// export default async function NotFoundPage() {

//   //   const t = await getTranslations("Navbar");

//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
//       <div className="flex flex-col row-start-2 items-center sm:items-start mt-12 lg:mt-38">
//         <div>
//           <Image
//             className="w-full sm:w-60 h-40 object-contain rounded-2xl"
//             src={"https://i.imgur.com/mS3Y1VQ.png"}
//             alt={"john"}
//             width={800}
//             height={1400}
//             priority
//           />
//           <p className="text-5xl text-red-500">NOT FOUND!!!!!!!!!!!!!</p>
//           <div className="mt-20 flex justify-center">
//             {/* <Loader2 className="animate-spin w-20 h-20 text-blue-cyan" /> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }