import Image from "next/image";
import { Background, LogoWord, World } from "@/app/components/shared/atoms/Icon";

export default function WorldMapSvg() {
    return (
        <div className="relative w-[360px] h-[280px]  sm:w-[640px] sm:h-[320px] md:w-[768px] md:h-[320px]">
            <Image src={World} alt="background" fill />
        </div>
    )
}