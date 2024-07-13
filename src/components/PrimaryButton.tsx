import { ReactNode } from "react"

// enum Button

interface ButtonType {
    children: string
    icon?: ReactNode
    style?: 'fill' | 'outline'
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
}

export default function PrimaryButton({ children, icon, style = 'fill', onClick, type = "button" }: ButtonType) {
    function getStyle(style?: 'fill' | 'outline') {
        return style === 'fill' ? 'bg-blue-500 text-white' : 'border border-slate-500'
    }

    return (
        <button type={type} onClick={onClick} className={"flex gap-2 items-center px-4 py-2 rounded-lg " + getStyle(style)}>
            {icon}
            <span className="font-semibold">{children}</span>
        </button>
    )
}