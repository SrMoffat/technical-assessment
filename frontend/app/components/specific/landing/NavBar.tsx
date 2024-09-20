import { CustomLink, LogoWordComponent } from "@/app/components/shared/atoms";
import { Button } from "antd"


export default function LandingPageNavBar() {
    return (
        <nav className='flex items-center justify-between px-4 md:px-10 lg:px-40 lg:pt-14 pt-8'>
            <LogoWordComponent />
            <div>
                <CustomLink className="hover:text-[#7078e8]" href="/login">Login</CustomLink>
                <CustomLink href="/register">
                    <Button className="ml-4" type="primary">Register</Button>
                </CustomLink>
            </div>
        </nav>
    )
}