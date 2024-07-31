import { ReactNode, useState } from "react";
import { QRKanbanCardType } from "../types/global";
import { ModalQRContext } from "./utils/modalQRContext";

export function ModalQRProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [data, setModalData] = useState<QRKanbanCardType>()
    const [modalType, setModalType] = useState<"production" | "withdrawal">()

    function openModalQR(data?: QRKanbanCardType) {
        setIsOpen(true)
        if (data) {
            setModalData(data)
            setModalType(data.type)
        }
    }

    function closeModalQR() {
        setIsOpen(false)
        setModalData(undefined)
    }

    return (
        <ModalQRContext.Provider value={{ isModalQRVisible: isOpen, openModalQR: openModalQR, closeModalQR: closeModalQR, modalQRData: data, modalQRType: modalType }}>
            {children}
        </ModalQRContext.Provider>
    )
}