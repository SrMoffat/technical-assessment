"use client"

import { LogoWord } from "@/app/components/shared/atoms/Icon";
import Image from "next/image";

export default function LandingPageFooter() {
    return (
        <footer className='flex flex-col items-center gap-2 py-20'>
            <div className='relative h-[24px] w-[120px]'>
                <Image src={LogoWord} alt="Reconcili8" fill />
            </div>
            <div className='flex justify-between'>
                {new Date().getFullYear()}
            </div>
        </footer>
    )
}