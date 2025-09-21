import { Link } from "@/i18n/navigation";

interface Props {
    text: string;
    href: string;
    onClick?: () => void;
}

export const ButtonMenu = ({ text, href }: Props) => {
    return (
        <Link href={href} className="w-sm text-center text-7xl text-neutral-400 p-4 my-5 hover:text-neutral-100 hover:border-neutral-100 hover:scale-110 transition duration-500 ease-in-out">
            {text}
        </Link>
    );
};