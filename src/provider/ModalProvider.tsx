import { ReactNode, useState } from "react";
import { ModalContext } from "./utils/modalContext";
import CreateOrderModal from "../pages/AssemblyLine/CreateOrderModal";
import { SecureApiProvider } from "./SecureApiProvider";

interface ModalStateType {
    [key: string]: boolean
    createOrder: boolean
}

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState<ModalStateType>({
        createOrder: false
    })

    function closeAllModals() {
        setIsOpen({ createOrder: false })
    }

    return (
        <ModalContext.Provider value={{
            isModalVisible: {
                createOrder: isOpen.createOrder
            },
            openModal: {
                createOrder: () => {
                    setIsOpen({ ...isOpen, createOrder: true })
                }
            },
            closeModal: closeAllModals
        }}>
            {children}

            {/* Modals */}
            <SecureApiProvider>
                {isOpen.createOrder && (
                    <CreateOrderModal onClose={closeAllModals} />
                )}
            </SecureApiProvider>
        </ModalContext.Provider>
    )
}