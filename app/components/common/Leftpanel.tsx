import Image from "../../atomic/atoms/Image"
import Placeholder from "./placeholder/Placeholder"

const Leftpanel = () => {
    return (
        <section className="bg-white hidden w-[560px] rounded-[12px] lg:flex items-center justify-center p-[24px]">
            <div className="w-[300px] relative overflow-auto ">
                <Image src="mobileFrame" alt="mobile" extension="svg" className="h-full w-full" />
                <Placeholder />
            </div>
        </section>
    )
}

export default Leftpanel
