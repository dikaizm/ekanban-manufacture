import { createContext, useContext } from "react"

interface ModalContextType {
    isModalVisible: {
        [key: string]: boolean
        createOrder: boolean
        setPlanShopFloor: boolean
        editPartQty: boolean
    }
    openModal: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: (item: any) => void
        createOrder: () => void
        setPlanShopFloor: (id: number) => void
        editPartQty: (id: number) => void
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