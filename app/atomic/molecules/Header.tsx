"use client"
import Logo from "../atoms/Logo"
import IconButton from "./IconButton"
import ButtonComponent from "../atoms/Button"
import useToggleStore from "@/zustand/useToggle"
import { buttonVariants } from "@/app/variants/variants"

const Header = () => {

    const { toggleLinkPage, isLinkPage } = useToggleStore();

    return (
        <header className="flex items-center py-[16px] px-[24px] justify-between bg-white">
            <Logo />
            <div className="flex items-center gap-[16px]">
                <IconButton
                    icon={{
                        src: "link",
                        alt: "link",
                        className:"text-blue100"
                    }}
                    button={{
                        children: "Links",
                        variant: buttonVariants.TRANSPARENT,
                    }}
                    className={`${isLinkPage ? "bg-lightPurple text-blue100" : "text-grey"} px-[27px] py-[11px]`}
                    onClick={toggleLinkPage}
                />

                <IconButton
                    icon={{
                        src: "user",
                        alt: "user",
                        className:"text-blue100"
                    }}
                    button={{
                        children: "Profile Details",
                        variant: buttonVariants.TRANSPARENT,
                    }}
                    className={`${isLinkPage ? "bg-lightPurple text-blue100" : "text-grey"} px-[27px] py-[11px] `}
                    onClick={toggleLinkPage}
                />
            </div>
            <ButtonComponent variant={buttonVariants.OUTLINE_FIT}>
                Preview
            </ButtonComponent>
        </header>
    )
}

export default Header
