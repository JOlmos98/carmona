"use client"

import { useLocale } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function LanguageSelector() {
    const pathname = usePathname()
    const locale = useLocale()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="uppercase text-neutral-600 text-2xl">
                    {locale}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit min-w-0" align="end">
                <DropdownMenuItem asChild>
                    <Link className="text-neutral-600" href={pathname} locale="en">
                        <span className="text-2xl">EN</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link className="text-neutral-600" href={pathname} locale="es">
                        <span className="text-2xl">ES</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link className="text-neutral-600" href={pathname} locale="de">
                        <span className="text-2xl">DE</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
