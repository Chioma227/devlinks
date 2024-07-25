"use client"
import clsx from 'clsx';
import DynamicIcon from '../atoms/Icon';
import { useState, useRef, useEffect } from 'react';

interface Option {
    value: string;
    label: string;
    color: string,
    icon: string;
}

interface CustomSelectProps {
    options: Option[];
    isSelectDisabled?:boolean;
    onSelect: (value: string, icon: string, color: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, onSelect, isSelectDisabled }) => {
    let style;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionSelect = (option: Option) => {
        setIsOpen(false);
        setSelectedOption(option);
        onSelect(option.label, option.icon, option.color);
    };


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if(isSelectDisabled){
        style = clsx(style, "opacity-50 text-muted cursor-not-allowed")
    }

    return (
        <div ref={dropdownRef}>
            <button disabled={isSelectDisabled}  className="bg-white border border-border w-[100%] text-left py-[7px] px-[10px] rounded-[8px]" onClick={handleToggleDropdown}>
                {selectedOption ? (
                    <div className='flex gap-[12px]'>
                        <DynamicIcon src={selectedOption.icon} alt="" className="option-icon" />
                        {selectedOption.label}
                    </div>
                ) : (
                    <p className='text-border'>Select Platform</p>
                )}
            </button>
            {isOpen && (
                <ul className="w-[100%] transition-all bg-white overflow-y-auto max-h-[200px] shadow-bg-shadow">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className="border-b cursor-pointer border-b-border hover:bg-mutedBlue flex items-center gap-[12px] py-[7px] px-[10px]"
                            onClick={() => handleOptionSelect(option)}
                        >
                            <DynamicIcon src={option.icon} alt="" className="option-icon" />
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
