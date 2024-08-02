import { createContext, useContext } from "react"
import { ModalQRPassType } from "../../types/global"

interface ModalQRContextType {
    isModalQRVisible: boolean
    openModalQR: ({ id, type }: ModalQRPassType) => void
    closeModalQR: () => void
}

export const ModalQRContext = createContext<ModalQRContextType | undefined>(undefined)

export function useModalQR() {
    const context = useContext(ModalQRContext)
    if (!context) {
        throw new Error('useModalQR must be used within ModalQRProvider')
    }
    return context
}