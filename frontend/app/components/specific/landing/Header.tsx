"use client"

import { LandingPageNavBar, LandingPageHero, LandingPageHeroAction } from "@/app/components/specific/landing"

export default function LandingPageHeader(props: any) {
    const { hasHero } = props
    return (
        <header>
            <LandingPageNavBar />
            {hasHero && (
                <>
                    <LandingPageHero />
                    <LandingPageHeroAction />
                </>
            )}
        </header>
    )
}
