import clsx from "clsx"
import DynamicIcon from "../atoms/Icon"
import ButtonComponent from "../atoms/Button"
import { buttonVariants } from "@/app/variants/variants"

interface iconProps {
    src: string,
    alt: string,
    className?: string,
}

interface buttonProps {
    variant: buttonVariants,
    className?: string,
    onClick?: () => void,
    children: React.ReactNode
    isDisabled?: boolean,
    type?: "submit" | "reset" | "button" | undefined
}

interface iconButtonProps {
    icon: iconProps,
    className?: string,
    button: buttonProps,
    onClick?: () => void,
}


const IconButton = ({ icon, button, className, onClick }: iconButtonProps) => {
    return (
        <>
            <div onClick={onClick} className={clsx(className, "flex items-center gap-[2px] rounded-[8px] outline-none bg-transparent",
                " font-medium transition-all duration-3 ")}>
                <DynamicIcon {...icon} />
                <ButtonComponent {...button} />
            </div>

         
        </>
    )
}

export default IconButton
