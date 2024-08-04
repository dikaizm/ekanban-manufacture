import { useEffect, useState } from "react"
import AuthenticatedLayout from "../../components/AuthenticatedLayout"
import Breadcrumb from "../../components/Breadcrumb"
import Table from "../../components/Table"
import MainTitle from "../../components/Title/MainTitle"
import { useSecureApi } from "../../provider/utils/secureApiContext"
import toast from "react-hot-toast"
import CircleLoading from "../../components/Loading"
import { useModal } from "../../provider/utils/modalContext"
import { ACTIONS } from "../../types/const"
import PrimaryButton from "../../components/PrimaryButton"

const breadcrumbItems = [
  {
    label: "Fabrication",
  },
  {
    label: "Shop Floor"
  }
]

const shopHead = {
  orderId: "Order ID",
  partNumber: "Part Number",
  partName: "Part Name",
  planStart: "Planned Start",
  planFinish: "Planned Finish",
  actualStart: "Actual Start",
  actualFinish: "Actual Finish",
  timeRemaining: "Time Remaining",
  station: "Station"
}

function ShopFloorPage() {
  return (
    <AuthenticatedLayout>
      <ShopFloorImpl />
    </AuthenticatedLayout>
  )
}

function ShopFloorImpl() {
  const { secureApi } = useSecureApi()
  const [shops, setShops] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { openModal, isModalVisible } = useModal()

  const fetchShops = async () => {
    try {
      const response = await secureApi('/fabrication/shop-floors').then(res => res.json())

      if (!response.success) {
        toast.error(response.message)
      }

      if (response.data) {
        // Change time remaining to minutes
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        response.data.forEach((shop: any) => {
          let timeRemaining = '';
          if (!shop.timeRemaining) return;

          const convertToMinutes = Math.floor(Math.abs(shop.timeRemaining) / 60000);
          const isLate = shop.timeRemaining < 0;

          const days = Math.floor(convertToMinutes / (60 * 24));
          const hours = Math.floor((convertToMinutes % (60 * 24)) / 60);
          const minutes = convertToMinutes % 60;

          const parts = [];
          if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
          if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
          if (minutes > 0 || (days === 0 && hours === 0)) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);

          timeRemaining = parts.join(' ');

          shop.timeRemaining = isLate ? `(Late) ${timeRemaining}` : timeRemaining;
        });

        setShops(response.data)
      }

    } catch (error) {
      toast.error("Failed to fetch shop floors")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchShops()
  }, [isModalVisible.setPlanShopFloor])

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      const response = await secureApi(`/fabrication/shop-floors/status`, {
        method: 'PUT',
        options: {
          body: JSON.stringify({ id, status }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }).then(res => res.json())

      if (response.success) {
        toast.success(response.message)
        fetchShops()
      } else {
        toast.error(response.message)
      }

    } catch (error) {
      toast.error("Failed to update shop floor status")
    }
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <MainTitle>Shop Floor</MainTitle>
          <PrimaryButton>Download</PrimaryButton>
        </div>

        {!isLoading ? (
          <Table head={shopHead} body={shops} actions={[
            {
              label: "Set Plan",
              color: "bg-orange-500",
              onClick: (id: number) => {
                openModal.setPlanShopFloor(id)
              },
              type: ACTIONS.SHOP_FLOOR_FABRICATION.SET_PLAN
            },
            {
              label: "Start",
              color: "bg-purple-500",
              onClick: (id: number) => {
                handleUpdateStatus(id, "in_progress")
              },
              type: ACTIONS.SHOP_FLOOR_FABRICATION.START
            },
            {
              label: "Finish",
              color: "bg-green-500",
              onClick: (id: number) => {
                handleUpdateStatus(id, "finish")
              },
              type: ACTIONS.SHOP_FLOOR_FABRICATION.FINISH
            }
          ]} />
        ) : (
          <CircleLoading className="h-[calc(100vh-16rem)]" />
        )}
      </div>
    </>
  )
}

export default ShopFloorPage