import { useEffect, useState } from "react"
import AuthenticatedLayout from "../../components/AuthenticatedLayout"
import Breadcrumb from "../../components/Breadcrumb"
import { KanbanColumn } from "../../components/Kanban"
import ModalQR from "../../components/ModalQR"
import MainTitle from "../../components/Title/MainTitle"
import { useModalQR } from "../../provider/utils/modalQRContext"
import { useSecureApi } from "../../provider/utils/secureApiContext"
import toast from "react-hot-toast"
import { PartKanbanType } from "../../types/global"

const breadcrumbItems = [
  {
    label: "Fabrication",
  },
  {
    label: "Kanban Board"
  }
]

export default function KanbanPage() {
  const { isModalQRVisible, modalQRData, modalQRType } = useModalQR()

  useEffect(() => {
    if (isModalQRVisible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    // Cleanup function to remove the class when the component unmounts
    return () => document.body.classList.remove('no-scroll');
  }, [isModalQRVisible]);

  return (
    <>
      <AuthenticatedLayout>
        <KanbanImpl />
      </AuthenticatedLayout>

      {isModalQRVisible && (
        <ModalQR
          id={modalQRData?.id}
          type={modalQRType}
        />
      )}
    </>
  )
}

interface KanbanType {
  queue: PartKanbanType[]
  progress: PartKanbanType[]
  done: PartKanbanType[]
}

function KanbanImpl() {
  const { secureApi } = useSecureApi()
  const [kanbans, setKanbans] = useState<KanbanType>({
    queue: [],
    progress: [],
    done: []
  })

  const fetchKanbans = async () => {
    try {
      const response = await secureApi('/fabrication/kanbans').then(res => res.json())
      if (!response.success) {
        toast.error(response.message)
        return
      }

      setKanbans(response.data)

    } catch (error) {
      toast.error("Failed to fetch kanban data")
    }
  }

  useEffect(() => {
    fetchKanbans()
  }, [])

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-4 sm:p-6">
        <MainTitle>Kanban Board</MainTitle>

        <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-3">
          <KanbanColumn title="Queue" color="bg-red-500" parts={kanbans.queue} type={"production"} />

          <KanbanColumn title="On Progress" color="bg-yellow-400" parts={kanbans.progress} type={"production"} />

          <KanbanColumn title="Done" color="bg-green-500" parts={kanbans.done} type={"production"} />
        </div>
      </div>
    </>
  )
}