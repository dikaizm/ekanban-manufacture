import { ChangeEvent, ReactNode } from "react"

interface InputTextType {
    id: string
    label: string
    placeholder?: string
    type?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    icon?: ReactNode
    disabled?: boolean
    error?: {
        value: string
        setValue: (value: string) => void
    },
    value?: string
}

export default function InputText({ id, label, placeholder, type = 'text', onChange, icon, disabled = false, error, value }: InputTextType) {

    return (
        <div className="flex flex-col items-start w-full gap-1">
            <label htmlFor={id}>{label}</label>
            <div className="relative w-full">
                {icon && <div className="absolute w-5 h-5 pr-10 -translate-y-1/2 left-3 top-1/2">{icon}</div>}
                <input value={value} className={"w-full p-2 border rounded-lg " + (disabled ? "bg-slate-100 " : " ") + (error?.value ? 'border-red-500' : 'border-gray-400 ')} type={type} id={id} onChange={(e) => {
                    if (onChange) {
                        onChange(e)
                    }
                    if (error?.value) {
                        error.setValue('')
                    }
                }} placeholder={placeholder} disabled={disabled} />
            </div>
            {error?.value && <span className="text-xs text-red-500">{error.value}</span>}
        </div>
    )
}