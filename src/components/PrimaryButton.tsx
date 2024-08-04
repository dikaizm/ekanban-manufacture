import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode;
    icon?: ReactNode;
    style?: 'fill' | 'outline';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    size?: 'sm';
    selected?: boolean;
}

export default function PrimaryButton({
    children,
    icon,
    style = 'fill',
    onClick,
    type = "button",
    disabled = false,
    className = "",
    size,
    selected = false
}: ButtonProps) {
    const getStyle = (style: 'fill' | 'outline'): string => {
        return style === 'fill' ? 'bg-blue-500 text-white' : 'border border-slate-500';
    };

    const sizeClass = size === 'sm' ? 'text-sm px-2 py-1' : 'px-4 py-2';
    const selectedClass = selected ? 'bg-blue-500 text-white' : '';
    const disabledClass = disabled ? "bg-gray-400 text-gray-100 cursor-not-allowed" : getStyle(style);

    const buttonClasses = [
        "flex gap-2 items-center rounded-lg h-fit",
        className,
        sizeClass,
        selectedClass,
        disabledClass
    ].join(" ");

    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onClick}
            className={buttonClasses}
        >
            {icon}
            <span className="font-semibold">{children}</span>
        </button>
    );
}