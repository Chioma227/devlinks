import Image from "next/image"

const Logo = () => {
  return (
    <div className="flex gap-[3px]">
      <Image width={50} height={50} src="/assets/images/logo.png" alt="logo"/>
      <h3 className="font-bold text-[30px]">devlinks</h3>
    </div>
  )
}

export default Logo
