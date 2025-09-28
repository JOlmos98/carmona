// "use client"

// import { useState } from "react"
// import { Settings } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { SettingsMenu } from "../Settings/SettingsMenu"
// import { OptionsMenu } from "./OptionsMenu"

// export function ShowOptions() {

//     const [isOpen, setIsOpen] = useState(false)

//     return (
//         <>
//             {/* <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50"> */}
//             <div className="fixed text-center z-50">
//                 <Dialog open={isOpen} onOpenChange={setIsOpen}>
//                     <DialogTrigger asChild>
//                         <Button
//                             size="lg"
//                             className={`w-sm text-center text-7xl text-neutral-400 p-4 my-4 hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition duration-500 ease-in-out`} //hover:translate-y-[-2px]
//                         > Options <Button />
//                             {/* <Settings className="w-5 h-5 text-white" /> */}
//                             {/* <span className="text-white text-sm font-medium">Configuraciones</span> */}
//                         </Button>
//                     </DialogTrigger>
//                     <DialogContent className="bg-neutral-900/95 backdrop-blur-md border-neutral-700 text-white max-w-md">
//                         <DialogHeader>
//                             <DialogTitle className="text-4xl text-neutral-200">Opciones</DialogTitle>
//                         </DialogHeader>
//                         <div className="space-y-6 py-4">
//                             <OptionsMenu />
//                         </div>
//                     </DialogContent>
//                 </Dialog>
//             </div>
//         </>
//     )
// }
