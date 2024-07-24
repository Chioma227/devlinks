import ImageComponent from "@/app/atomic/atoms/Image"

const Empty = () => {
    return (
        <>
            <section className=" flex items-center mb-[40px] flex-col justify-center bg-white50 rounded-[12px] space-y-[40px] p-[20px] h-[100%]">
                <div className="w-[250px]">
                    <ImageComponent src="getStarted" alt="getStarted" extension="svg" className="w-full h-[full]" />
                </div>
                <div className="text-center space-y-[24px] w-[488px]">
                    <h3 className="text-[32px] font-bold">Let&apos;s get you started</h3>
                    <p className="text-[16px] text-grey">Use the &quot;Add new link&quot; button to get started have more than one link, You can reorder and edit them. We&apos;re here to help you share your profiles with everyone.</p>
                </div>
            </section>
          
        </>
    )
}

export default Empty
