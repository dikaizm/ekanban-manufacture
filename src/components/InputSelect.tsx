import { ReactNode } from "react"

interface SelectInputType {
    id: string
    label: string
    options: { value: string, label: string }[]
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    icon?: ReactNode
    disabled?: boolean
    error?: {
        value: string
        setValue: (value: string) => void
    },
    value: string
}

export default function SelectInput({ id, label, options, onChange, icon, disabled = false, error, value }: SelectInputType) {

    return (
        <div className="flex flex-col items-start w-full gap-1">
            <label htmlFor={id}>{label}</label>
            <div className="relative w-full">
                {icon && <div className="absolute w-5 h-5 pr-10 -translate-y-1/2 left-3 top-1/2">{icon}</div>}
                <select value={value} className={"w-full p-2 border rounded-lg " + (error?.value ? 'border-red-500' : 'border-gray-400')} id={id} onChange={(e) => {
                    if (onChange) {
                        onChange(e)
                    }
                    if (error?.value) {
                        error.setValue('')
                    }
                }} disabled={disabled}>
                    <option value="" disabled>Select an option</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {error?.value && <span className="text-xs text-red-500">{error.value}</span>}
        </div>
    )
}
