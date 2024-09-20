interface ServiceProps {
    index: number;
    title: string;
    content: string;
}

export default function LandingPageService(props: ServiceProps) {
    return (
        <div className="flex flex-col items-center py-10 gap-6 md:flex-row md:px-24 lg:flex-col">
            <div className="rounded-full h-12 w-12 border border-white flex items-center justify-center font-fraunces">{props.index}</div>
            <div className="flex flex-col items-center gap-4 px-4 md:items-start md:max-w-[520px] lg:max-w-full lg:items-center lg:px-0">
                <h1 className="font-fraunces wonky text-[28px] font-semibold leading-[36px]">{props.title}</h1>
                <p className="text-davys-grey font-manrope font-normal leading-[28px] text-center md:text-start lg:text-center">{props.content}</p>
            </div>
        </div>
    )
}