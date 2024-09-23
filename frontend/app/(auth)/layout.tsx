"use client"
import { LandingPageFooter, LandingPageHeader } from "@/app/components/specific/landing"

export default function UnauthenticatedLayout(props: any) {
    const { children, hasHero } = props
    return (
        <>
            <LandingPageHeader hasHero={hasHero} />
            {children}
            <LandingPageFooter />
        </>
    )
}