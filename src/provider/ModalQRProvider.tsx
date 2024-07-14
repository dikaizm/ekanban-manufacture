import { ReactNode, useState } from "react";
import { QRKanbanCardType } from "../types/global";
import { ModalQRContext } from "./utils/modalQRContext";

export function ModalQRProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [data, setModalData] = useState<QRKanbanCardType>()

    function openModalQR(data?: QRKanbanCardType) {
        setIsOpen(true)
        if (data) {
            setModalData(data)
        }
    }

    function closeModalQR() {
        setIsOpen(false)
        setModalData(undefined)
    }

    return (
        <ModalQRContext.Provider value={{ isModalQRVisible: isOpen, openModalQR: openModalQR, closeModalQR: closeModalQR, modalQRData: data }}>
            {children}
        </ModalQRContext.Provider>
    )
}