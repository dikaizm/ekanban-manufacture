import { ReactNode } from "react"

// enum Button

interface ButtonType {
    children: ReactNode
    icon?: ReactNode
    style?: 'fill' | 'outline'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick?: (event: any) => void
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    className?: string
}

export default function PrimaryButton({ children, icon, style = 'fill', onClick, type = "button", disabled, className }: ButtonType) {
    function getStyle(style?: 'fill' | 'outline') {
        return style === 'fill' ? 'bg-blue-500 text-white' : 'border border-slate-500'
    }

    return (
        <button disabled={disabled} type={type} onClick={onClick} className={"flex gap-2 items-center px-4 py-2 rounded-lg " + className + " " + (disabled ? "bg-gray-400 text-gray-100 cursor-not-allowed" : getStyle(style))}>
            {icon}
            <span className="font-semibold">{children}</span>
        </button>
    )
}