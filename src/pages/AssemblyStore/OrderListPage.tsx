import { useEffect, useRef, useState } from "react"
import AuthenticatedLayout from "../../components/AuthenticatedLayout"
import Breadcrumb from "../../components/Breadcrumb"
import PrimaryButton from "../../components/PrimaryButton"
import Table from "../../components/Table"
import MainTitle from "../../components/Title/MainTitle"
import { OrderStoreType } from "../../types/global"
import { useSecureApi } from "../../provider/utils/secureApiContext"
import CircleLoading from "../../components/Loading"
import toast from "react-hot-toast"
import { ACTIONS } from "../../types/const"
import DownloadTableExcel from "../../components/DownloadTableExcel"

const breadcrumbItems = [
  {
    label: "Assembly Store",
  },
  {
    label: "Order List"
  }
]

const orderHead = {
  partNumber: "Part Number",
  partName: "Part Name",
  orderId: "Order ID",
  kanbanId: "Kanban ID",
  quantity: "Quantity",
  stock: "Stock",
  status: "Status"
}

function OrderListPage() {
  return (
    <AuthenticatedLayout>
      <OrderListImpl />
    </AuthenticatedLayout>
  )
}

type RequestDataType = {
  id: number
  status: string
  requestHost?: string
}

function OrderListImpl() {
  const tableRef = useRef<HTMLTableElement>(null)
  const { secureApi } = useSecureApi()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [orders, setOrders] = useState<OrderStoreType[]>([])

  const fetchOrders = async () => {
    try {
      const response = await secureApi('/assembly-store/orders').then(res => res.json())

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

  async function handleActionBtn(orderId: number, status: string) {
    try {
      const data: RequestDataType = { id: orderId, status: status }
      if (status === 'production') {
        data.requestHost = document.location.host
      }

      const response = await secureApi('/assembly-store/orders/status', {
        method: 'POST',
        options: {
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }).then(res => res.json())

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
          <DownloadTableExcel filename="assembly-store-order-list" sheet="order list" currentTableRef={tableRef.current!}>
            <PrimaryButton>Download</PrimaryButton>
          </DownloadTableExcel>
        </div>

        {!isLoading ? (
          <Table tableRef={tableRef} head={orderHead} body={orders} actions={[
            {
              label: "Production",
              color: "bg-purple-500",
              onClick: (orderId) => {
                handleActionBtn(orderId, "production")
              },
              type: ACTIONS.ORDER_STORE.PRODUCTION
            },
            {
              label: "Deliver",
              color: "bg-green-500",
              onClick: (orderId) => {
                handleActionBtn(orderId, "deliver")
              },
              type: ACTIONS.ORDER_STORE.DELIVER
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