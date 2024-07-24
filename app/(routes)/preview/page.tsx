"use client"
import DynamicIcon from "@/app/atomic/atoms/Icon"
import { useLinkStore } from "@/zustand/useLinkStore"
import Link from "next/link"
import { FaArrowRight } from "react-icons/fa6";

const Preview = () => {
    const { links } = useLinkStore()
    return (
        <main>
            <header className="bg-blue100 w-[100%] h-[357px] rounded-bl-[20px] rounded-br-[20px]">

            </header>
            <section className=" flex items-center justify-center mt-[-15%]">
                <main className="w-[394px] shadow-bg-shadow bg-white h-[569px] p-[56px] rounded-[24px]">
                    <div>somethinghere</div>
                    <div className="block space-y-[20px]">
                        {links.map((link, i) => {
                            return (
                                <div key={i} style={{ background: link.platformColor }} className="text-white flex items-center justify-between h-[56px] rounded-[12px] p-[16px]">
                                    <div className="gap-[8px] flex items-center">
                                        <DynamicIcon src={link.icon} alt={link.platform} />
                                        <Link href={link.newLink} className="">
                                            {link.platform}
                                        </Link>
                                    </div>
                                    <FaArrowRight className="text-white" />
                                </div>
                            )
                        })}
                    </div>
                </main>
            </section>
        </main>
    )
}

export default Preview
