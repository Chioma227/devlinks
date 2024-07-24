"use client"
import Logo from "../atoms/Logo"
import IconButton from "./IconButton"
import ButtonComponent from "../atoms/Button"
import useToggleStore from "@/zustand/useToggle"
import { buttonVariants } from "@/app/variants/variants"
import DynamicIcon from "../atoms/Icon"

const Header = () => {

    const { toggleLinkPage, isLinkPage } = useToggleStore();

    return (
        <header className="flex items-center py-[16px] md:px-[24px] px-[20px] justify-between bg-white">
            <Logo />
            <div className="sm:flex items-center gap-[16px] hidden">
                <IconButton
                    icon={{
                        src: "link",
                        alt: "link",
                        className: "text-blue100"
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
                        className: "text-blue100"
                    }}
                    button={{
                        children: "Profile Details",
                        variant: buttonVariants.TRANSPARENT,
                    }}
                    className={`${isLinkPage ? "bg-lightPurple text-blue100" : "text-grey"} px-[27px] py-[11px]`}
                    onClick={toggleLinkPage}
                />
            </div>
            <div className="sm:hidden flex gap-3 items-center">
                <DynamicIcon src="link" alt="link" className="w-[20px]"/>
                <DynamicIcon src="user" alt="user" className="w-[20px]"/>
            </div>
            <ButtonComponent variant={buttonVariants.OUTLINE_FIT} className="md:block hidden">
                Preview
            </ButtonComponent>
            <DynamicIcon src="publish" alt="publish" className="w-[45px] md:hidden block"/>
        </header>
    )
}

export default Header
