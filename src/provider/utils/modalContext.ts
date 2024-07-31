import { createContext, useContext } from "react"

interface ModalContextType {
    isModalVisible: {
        [key: string]: boolean
        createOrder: boolean
    }
    openModal: {
        [key: string]: () => void
        createOrder: () => void
    }
    closeModal: () => void
}

export const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function useModal() {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModal must be used within ModalProvider')
    }
    return context
}