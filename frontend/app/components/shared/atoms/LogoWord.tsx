import Image from "next/image";
import { Background, LogoWord, World } from "@/app/components/shared/atoms/Icon";

export default function Logo() {
    return (
        <div className="relative flex items-center h-[40px] w-[170px]">
            <Image src={LogoWord} alt="Reconcili8" fill />
        </div>
    )
}