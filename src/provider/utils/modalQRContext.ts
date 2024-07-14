import { createContext, useContext } from "react"
import { QRKanbanCardType } from "../../types/global"

interface ModalQRContextType {
    isModalQRVisible: boolean
    openModalQR: (data?: QRKanbanCardType) => void
    closeModalQR: () => void
    modalQRData?: QRKanbanCardType
}

export const ModalQRContext = createContext<ModalQRContextType | undefined>(undefined)

export function useModalQR() {
    const context = useContext(ModalQRContext)
    if (!context) {
        throw new Error('useModalQR must be used within ModalQRProvider')
    }
    return context
}