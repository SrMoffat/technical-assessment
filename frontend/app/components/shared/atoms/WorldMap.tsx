import { World } from "@/app/components/shared/atoms/Icon";
import Image from "next/image";

export default function WorldMapSvg() {
    return (
        <div className="relative w-[360px] h-[280px]  sm:w-[640px] sm:h-[320px] md:w-[768px] md:h-[320px]">
            <Image src={World} alt="background" fill />
        </div>
    )
}