import clsx from 'clsx';
import { inputVariant } from '@/app/variants/variants';

interface inputProps {
    name: string,
    type?: string,
    value?: string,
    isError?: boolean,
    errorMsg?: string,
    className?: string,
    placeholder: string,
    isDisabled?: boolean,
    variant?: inputVariant,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const { DEFAULT } = inputVariant

const InputField = ({
    type,
    name,
    value,
    variant,
    isError,
    onChange,
    errorMsg,
    className,
    isDisabled,
    placeholder,
}: inputProps) => {

    let style;

    if (isError) {
        className = clsx(style, "border-1 border-red")
    }
    if (isDisabled) {
        className = clsx(style, "opacity-50 cursor--not-allowed")
    }

    switch (variant) {
        case DEFAULT:
            style = clsx(className,
                " border-1 w-full bg-transparent pl-[35px] rounded-[8px] py-[9px] transition-all",
                "outline-none focus:shadow-focus-shadow border"
            )
            break;
        default:
            break;
    }
    return (
        <div className=''>
            <input
                name={name}
                type={type}
                disabled={isDisabled}
                defaultValue={value}
                onChange={onChange}
                placeholder={placeholder}
                className={clsx(className, style,)}
            />
            {isError && <small className=' px-[9px] absolute z-30 right-[9px] top-[9px] text-red'>{errorMsg}</small>}
        </div>
    )
}

export default InputField;