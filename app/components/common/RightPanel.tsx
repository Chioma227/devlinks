"use client"
import useToggleStore from "@/zustand/useToggle"
import AddLinks from "@/app/atomic/pages/AddLinks"
import SetupProfile from "@/app/atomic/pages/SetupProfile"

const RightPanel = () => {
    const { isLinkPage } = useToggleStore()

    return (
        <>
            <section className='lg:w-[808px]  w-[100%] bg-white overflow-y-scroll rounded-[12px] p-[24px]'>
                {isLinkPage ? <AddLinks /> : <SetupProfile />}
            </section>
         
        </>
    )
}

export default RightPanel
