import Link from "next/link";

export default function CustomLink(props: any) {
    const { children, href, className } = props
    return (
        <Link className={className} href={href}>{children}</Link>

    )
}