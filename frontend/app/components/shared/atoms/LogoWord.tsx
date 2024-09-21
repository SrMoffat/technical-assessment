import { LogoWord } from "@/app/components/shared/atoms/Icon";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/">
            <div className="relative flex items-center h-[40px] w-[170px]">
                <Image src={LogoWord} alt="Reconcili8" fill />
            </div>
        </Link>
    )
}