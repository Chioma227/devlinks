import clsx from 'clsx';
import { inputVariant } from '@/app/variants/variants';

interface inputProps {
    name: string,
    isError?: boolean,
    errorMsg?: string,
    type?: string,
    readonly?: boolean,
    value?: string,
    className?: string,
    placeholder: string,
    variant?: inputVariant,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const { DEFAULT } = inputVariant

const InputField = ({
    type,
    name,
    value,
    variant,
    onChange,
    errorMsg,
    isError,
    className,
    readonly,
    placeholder,
}: inputProps) => {

    let style;

    if (isError) {
        className = clsx(style, "border-1 border-red")
    }

    switch (variant) {
        case DEFAULT:
            style = clsx(className,
                " border-1 w-full rounded-[8px] indent-[10px] py-[5px] transition-all",
                "my-input outline-none focus:shadow-focus-shadow border"
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
                readOnly={readonly}
                defaultValue={value}
                onChange={onChange}
                placeholder={placeholder}
                className={clsx(style, className, "py-[9px]")}
            />
            {isError && <small className=' px-[9px] absolute z-30 right-[9px] top-[9px] text-red'>{errorMsg}</small>}
        </div>
    )
}

export default InputField;