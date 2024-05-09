import { Dispatch, createContext, useContext } from "react"

interface TooltipContextType {
    tooltipState: {
        photoelectric: boolean
        camera: boolean
        conveyor: boolean
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tooltipDispatch: Dispatch<any>
}

export const TooltipContext = createContext<TooltipContextType | undefined>(undefined)

export function useToggleTooltip() {
    const context = useContext(TooltipContext)
    if (!context) {
        throw new Error('useToggleTooltip must be used within TooltipProvider')
    }
    return context
}