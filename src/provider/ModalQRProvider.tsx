import { ReactNode, useState } from "react";
import { ModalQRContext } from "./utils/modalQRContext";
import { ModalQRPassType } from "../types/global";
import ModalQR from "../components/ModalQR";

export function ModalQRProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [data, setModalData] = useState<ModalQRPassType>()
    const [count, setCount] = useState<number>(0)

    function openModalQR({ id, type }: ModalQRPassType) {
        setIsOpen(true)
        setModalData({ id, type })
    }

    function closeModalQR() {
        setIsOpen(false)
        setModalData(undefined)
    }

    function updateModalQR() {
        setCount(count + 1)
    }

    return (
        <ModalQRContext.Provider value={{
            isModalQRVisible: isOpen,
            openModalQR: openModalQR,
            closeModalQR: closeModalQR,
            countUpdateModalQR: count,
            updateModalQR: updateModalQR
        }}>
            {children}

            {isOpen && (
                <ModalQR
                    id={data?.id}
                    type={data?.type}
                />
            )}
        </ModalQRContext.Provider>
    )
}