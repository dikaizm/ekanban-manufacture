import { useEffect, useState } from "react"
import AuthenticatedLayout from "../../components/AuthenticatedLayout"
import Breadcrumb from "../../components/Breadcrumb"
import PrimaryButton from "../../components/PrimaryButton"
import Table from "../../components/Table"
import MainTitle from "../../components/Title/MainTitle"
import { ACTIONS } from "../../types/const"
import { useSecureApi } from "../../provider/utils/secureApiContext"
import CircleLoading from "../../components/Loading"
import toast from "react-hot-toast"

const breadcrumbItems = [
  {
    label: "Fabrication",
  },
  {
    label: "Order List"
  }
]

const orderHead = {
  orderId: "Order ID",
  partNumber: "Part Number",
  partName: "Part Name",
  kanbanId: "Kanban ID",
  status: "Status"
}

function OrderListPage() {
  return (
    <AuthenticatedLayout>
      <OrderListImpl />
    </AuthenticatedLayout>
  )
}

function OrderListImpl() {
  const { secureApi } = useSecureApi()
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchOrders = async () => {
    try {
      const response = await secureApi('/fabrication/orders').then(res => res.json())

      if (!response.success) {
        toast.error(response.message)
      }

      if (response.data) {
        setOrders(response.data)
      }

    } catch (error) {
      toast.error("Failed to fetch orders")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  async function handleDeliverBtn(orderId: number) {
    try {
      const response = await secureApi(`/fabrication/orders/deliver/${orderId}`).then(res => res.json())

      if (response.success) {
        toast.success(response.message)
        fetchOrders()
      } else {
        toast.error(response.message)
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <MainTitle>Order List</MainTitle>
          <PrimaryButton>Download</PrimaryButton>
        </div>

        {!isLoading ? (
          <Table head={orderHead} body={orders} actions={[
            {
              label: "Deliver",
              color: "bg-green-500",
              onClick: (orderId) => {
                handleDeliverBtn(orderId)
              },
              type: ACTIONS.ORDER_FABRICATION.DELIVER
            }
          ]} />
        ) : (
          <CircleLoading className="h-[calc(100vh-16rem)]" />
        )}
      </div>
    </>
  )
}

export default OrderListPage