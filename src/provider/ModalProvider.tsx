import { ReactNode, useState } from "react";
import { ModalContext } from "./utils/modalContext";
import CreateOrderModal from "../pages/AssemblyLine/CreateOrderModal";
import { SecureApiProvider } from "./SecureApiProvider";
import SetPlanShopFloorModal from "../pages/Fabrication/SetPlanShopFloorModal";

interface ModalStateType {
  [key: string]: boolean
  createOrder: boolean
  setPlanShopFloor: boolean
}

interface ModalIdType {
  [key: string]: number
  setPlanShopFloor: number
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<ModalStateType>({
    createOrder: false,
    setPlanShopFloor: false
  })
  const [modalId, setModalId] = useState<ModalIdType>({} as ModalIdType);

  function closeAllModals() {
    setIsOpen({ createOrder: false, setPlanShopFloor: false })
  }

  return (
    <ModalContext.Provider value={{
      isModalVisible: {
        createOrder: isOpen.createOrder,
        setPlanShopFloor: isOpen.setPlanShopFloor
      },
      openModal: {
        createOrder: () => {
          setIsOpen({ ...isOpen, createOrder: true })
        },
        setPlanShopFloor: (id: number) => {
          setModalId({ ...modalId, setPlanShopFloor: id })
          setIsOpen({ ...isOpen, setPlanShopFloor: true })
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
        {isOpen.setPlanShopFloor && (
          <SetPlanShopFloorModal id={modalId.setPlanShopFloor} onClose={closeAllModals} />
        )}
      </SecureApiProvider>
    </ModalContext.Provider>
  )
}