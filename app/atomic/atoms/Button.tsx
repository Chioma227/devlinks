import clsx from "clsx"
import { buttonVariants } from "@/app/variants/variants"

interface buttonProps {
    variant: buttonVariants,
    className?: string,
    onClick?: () => void,
    children: React.ReactNode
    isDisabled?: boolean,
    type?: "submit" | "reset" | "button" | undefined
}

const {
    FILLED_FIT,
    OUTLINE_FIT,
    FILLED_FULL,
    OUTLINE_FULL,
    TRANSPARENT
} = buttonVariants

const ButtonComponent = ({
    variant,
    className,
    onClick,
    children,
    isDisabled,
    type
}: buttonProps) => {

    let style;

    if (isDisabled) {
        style = clsx(style, "bg-mutedBlue cursor-not-allowed")
    }

    switch (variant) {
        case FILLED_FIT:
            style = clsx(className, "px-[27px] py-[11px] bg-blue100 rounded-[8px] text-white hover:bg-activeBlue transition-all")
            break;
        case OUTLINE_FIT:
            style = clsx(className, "px-[27px] py-[11px] border-[1.5px] rounded-[8px]",
                "bg-transparent font-medium border-blue100 text-blue100 transition-all duration-3 hover:bg-lightPurple"
            )
            break;
        case FILLED_FULL:
            style = clsx(className, "px-[27px] w-[100%] py-[11px] border-[1.5px] rounded-[8px]",
                "bg-blue100 hover:bg-activeBlue transition-all font-medium text-white"
            )
            break;
        case OUTLINE_FULL:
            style = clsx(className, "px-[27px] w-[100%] py-[11px] border-[1.5px] rounded-[8px] transition-all duration-3 hover:bg-lightPurple",
                "bg-transparent font-medium border-blue100 font-medium text-blue100 text-blue100"
            )
            break;
        case TRANSPARENT:
            style = clsx(className)
            break;

        default:
            break;
    }

    return (
        <button type={type} disabled={isDisabled} onClick={onClick} className={clsx(style, className)}>
            {children}
        </button>
    )
}

export default ButtonComponent
