'use client'
import { inputVariant } from "@/app/variants/variants";
import CustomSelect from "../molecules/CustomSelect"
import IconInput from "../molecules/IconInput"
import options from "@/app/data/options";

interface templateProps {
    id: number,
    value: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleRemove?: () => void;
    handleSelect: (value: string, icon:string, color:string) => void
}

const LinkTemplate = ({ onChange, value, handleRemove, handleSelect, id }: templateProps) => {

    return (
        <main className="bg-white50 rounded-[12px] p-[20px] space-y-[12px] mb-[12px]">
            <div className="flex justify-between items-center">
                <p className="text-grey font-semibold">Link #{id}</p>
                <p className="text-grey cursor-pointer" onClick={handleRemove}>Remove</p>
            </div>
            <section className="space-y-[12px]">
                <div>
                    <small>Platform</small>
                    <CustomSelect options={options} onSelect={handleSelect} />
                </div>
                <div>
                    <IconInput
                        icon={{
                            src: "link",
                            alt: "link"
                        }}
                        input={{
                            name: "link",
                            type: "url",
                            value: value,
                            className: "",
                            onChange: onChange,
                            placeholder: "https://www.me.com/johndoe",
                            variant: inputVariant.DEFAULT
                        }}
                        label="Link"
                    />
                </div>
            </section>
        </main>
    )
}

export default LinkTemplate
