"use client"
import { capitalizeFirstLetter } from "@/app/utils"
import React, { createContext, PropsWithChildren, useContext, useState, useEffect } from "react"

export enum PAGES {
    HOME = "home",
    PROFILE = "profile",
    DASHBOARD = "dashboard",
}

interface NavigationContextProps {
    current: PAGES
    breadcrumbs: string[]
    setCurrent: React.Dispatch<React.SetStateAction<PAGES>>
    setBreadcrumbs: React.Dispatch<React.SetStateAction<string[]>>
}

const NavigationContext = createContext<Partial<NavigationContextProps>>({});

const useNavigationContext = (): Partial<NavigationContextProps> => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigationContext must be used within a TbdexContextProvider');
    }
    return context;
};

const NavigationContextProvider = ({ children }: PropsWithChildren) => {
    const HOME_BREADCRUMB = capitalizeFirstLetter(PAGES.HOME)

    const [current, setCurrent] = useState(PAGES.DASHBOARD);
    const [breadcrumbs, setBreadcrumbs] = useState<string[]>([HOME_BREADCRUMB]);


    useEffect(() => {
        const isDashbaoard = current === PAGES.DASHBOARD
        const isProfile = current === PAGES.PROFILE

        const breadcrumbs = isDashbaoard
            ? [capitalizeFirstLetter(PAGES.DASHBOARD)]
            : isProfile
                ? [capitalizeFirstLetter(PAGES.PROFILE)]
                : []

        setBreadcrumbs([HOME_BREADCRUMB, ...breadcrumbs])
        // setBreadcrumbs(prev => ([...prev, ...breadcrumbs]))
    }, [])

    return <NavigationContext.Provider value={{
        current,
        setCurrent,
        breadcrumbs,
        setBreadcrumbs,
    }}>
        {children}
    </NavigationContext.Provider>
}

export { NavigationContext, NavigationContextProvider, useNavigationContext }
