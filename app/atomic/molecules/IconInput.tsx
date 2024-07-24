import InputField from "../atoms/Input"
import DynamicIcon from "../atoms/Icon"
import { inputVariant } from "@/app/variants/variants"


interface inputProps {
    name: string,
    type: string,
    isError?: boolean,
    errorMsg?: string,
    value: string,
    className: string,
    placeholder: string,
    variant: inputVariant,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

interface iconProps {
    src: string,
    alt: string,
    className?: string,
}

interface IIProps {
    input: inputProps,
    icon: iconProps,
    label: string,
    className?: string,
    name?: string,
}

const IconInput = ({ input, icon, name, label, className }: IIProps) => {
    return (
        <section className={className}>
            <label htmlFor={name} className="text-[13px] text-dark_grey font-medium">{label}</label>
            <div className="relative">
                <DynamicIcon
                    {...icon}
                    className="absolute top-[12px] left-[12px] flex items-center h-[19px]"
                />
                <InputField
                    {...input}
                    // className="px-[60px] "
                />
            </div>
        </section>
    )
}

export default IconInput
