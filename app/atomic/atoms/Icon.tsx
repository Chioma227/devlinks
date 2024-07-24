import Image from "next/image"
import clsx from "clsx"
interface iconProps {
    src: string,
    alt: string,
    className?: string,
}

const DynamicIcon = ({ src, alt, className }: iconProps) => {

    const dynamicIconSrc = `/assets/icons/${src}.svg`

    return (
        <Image
            alt={alt}
            width={13}
            height={13}
            style={{color: "white"}}
            src={dynamicIconSrc}
            className={clsx(className, "text-white")}
        />
    )
}

export default DynamicIcon
