import Image from "next/image"

const Logo = () => {
  return (
    <div className="flex gap-[3px] items-center">
      <div className="sm:h-[40px] sm:w-[40px] w-[30px] h-[30px]">
        <Image width={50} height={50} src="/assets/images/logo.png" alt="logo" className="w-full h-full" />
      </div>
      <h3 className="font-bold text-[30px] md:block hidden">devlinks</h3>
    </div>
  )
}

export default Logo
