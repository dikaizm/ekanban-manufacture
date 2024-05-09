import { ReactNode } from "react"

interface ButtonType {
    children: string
    icon?: ReactNode
    style?: 'fill' | 'outline'
    onClick?: () => void
}

export default function PrimaryButton({ children, icon, style = 'fill', onClick }: ButtonType) {
    function getStyle(style?: 'fill' | 'outline') {
        return style === 'fill' ? 'bg-blue-400 text-white' : 'border border-slate-400'
    }

    return (
        <button type="button" onClick={onClick} className={"flex gap-2 items-center px-3 py-2 rounded-lg " + getStyle(style)}>
            <span className="text-sm font-semibold">{children}</span>
            {icon}
        </button>
    )
}