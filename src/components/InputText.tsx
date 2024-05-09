import { ChangeEvent, ReactNode, useEffect, useState } from "react"

interface InputTextType {
    id: string
    label: string
    placeholder?: string
    type?: string
    value: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    icon?: ReactNode
    disabled?: boolean
    error?: {
        value: string
        setValue: (value: string) => void
    }
}

export default function InputText({ id, label, placeholder, type = 'text', value, onChange, icon, disabled = false, error }: InputTextType) {
    const [prevValue, setPrevValue] = useState<string>('')

    useEffect(() => {
        if (prevValue !== value) {
            error?.setValue('')
        }
    })

    useEffect(() => {
        setPrevValue(value)
    }, [value])

    return (
        <div className="flex flex-col items-start w-full gap-1">
            <label htmlFor={id}>{label}</label>
            <div className="relative w-full">
                {icon && <div className="absolute w-5 h-5 -translate-y-1/2 left-3 top-1/2">{icon}</div>}
                <input className={"w-full p-2 pl-10 border rounded-lg " + (error?.value ? 'border-red-500' : 'border-gray-400 ')} type={type} id={id} onChange={onChange} value={value} placeholder={placeholder} disabled={disabled} />
            </div>
            {error?.value && <span className="text-xs text-red-500">{error.value}</span>}
        </div>
    )
}