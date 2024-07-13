import AuthenticatedLayout from "../../components/AuthenticatedLayout"
import PrimaryButton from "../../components/PrimaryButton"
import MainTitle from "../../components/Title/MainTitle"
import Table from "../../components/Table"
import { useEffect, useState } from "react"
import CreateOrderModal from "./CreateOrderModal"

const orderHead = ["Part Number", "Part Name", "Quantity", "Status"]

const orderBody = [
  {
    partNumber: "asdhasidha",
    partName: "Part 1",
    quantity: 10,
    status: "Pending"
  },
  {
    partNumber: "jabduyq",
    partName: "Part 2",
    quantity: 20,
    status: "Completed"
  }
]

export default function OrderListPage() {
  const [createOrderModal, setCreateOrderModal] = useState<boolean>(false)

  useEffect(() => {
    if (createOrderModal) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    // Cleanup function to remove the class when the component unmounts
    return () => document.body.classList.remove('no-scroll');
  }, [createOrderModal]);

  return (
    <>
      <AuthenticatedLayout>
        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            <MainTitle>Order List</MainTitle>
            <PrimaryButton onClick={() => {
              setCreateOrderModal(true)
            }}>Create Order</PrimaryButton>
          </div>

          <Table head={orderHead} body={orderBody} />
        </div>
      </AuthenticatedLayout>

      {createOrderModal && (
        <CreateOrderModal onClose={() => setCreateOrderModal(false)} />
      )}
    </>
  )
}