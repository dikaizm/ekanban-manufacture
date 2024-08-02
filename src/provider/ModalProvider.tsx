import { ReactNode, useState } from "react";
import { ModalContext } from "./utils/modalContext";
import CreateOrderModal from "../pages/AssemblyLine/CreateOrderModal";
import { SecureApiProvider } from "./SecureApiProvider";
import SetPlanShopFloorModal from "../pages/Fabrication/SetPlanShopFloorModal";
import EditPartQtyModal from "../pages/AssemblyLine/EditPartQtyModal";

interface ModalStateType {
  [key: string]: boolean
  createOrder: boolean
  setPlanShopFloor: boolean
  editPartQty: boolean
}

interface ModalIdType {
  [key: string]: number
  setPlanShopFloor: number
  editPartQty: number
}

const initModalState = {
  createOrder: false,
  setPlanShopFloor: false,
  editPartQty: false,
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<ModalStateType>(initModalState)
  const [modalId, setModalId] = useState<ModalIdType>({} as ModalIdType);

  function closeAllModals() {
    setIsOpen(initModalState)
  }

  return (
    <ModalContext.Provider value={{
      isModalVisible: {
        createOrder: isOpen.createOrder,
        setPlanShopFloor: isOpen.setPlanShopFloor,
        editPartQty: isOpen.editPartQty
      },
      openModal: {
        createOrder: () => {
          setIsOpen({ ...isOpen, createOrder: true })
        },
        setPlanShopFloor: (id: number) => {
          setModalId({ ...modalId, setPlanShopFloor: id })
          setIsOpen({ ...isOpen, setPlanShopFloor: true })
        },
        editPartQty: (id: number) => {
          setModalId({ ...modalId, editPartQty: id })
          setIsOpen({ ...isOpen, editPartQty: true })
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
        {isOpen.editPartQty && (
          <EditPartQtyModal id={modalId.editPartQty} onClose={closeAllModals} />
        )}
      </SecureApiProvider>
    </ModalContext.Provider>
  )
}