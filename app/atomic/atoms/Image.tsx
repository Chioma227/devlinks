import Image from "next/image"

interface imageProps {
    src: string,
    alt: string,
    className?: string,
    extension: string
}

const ImageComponent = ({ src, alt, className, extension }: imageProps) => {
    const dynamicIconSrc = `/assets/images/${src}.${extension}`

    return (
        <Image
            alt={alt}
            width={80}
            height={80}
            src={dynamicIconSrc}
            className={className}
        />
    )
}

export default ImageComponent
