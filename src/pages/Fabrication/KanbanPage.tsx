import { useEffect, useState } from "react"
import AuthenticatedLayout from "../../components/AuthenticatedLayout"
import Breadcrumb from "../../components/Breadcrumb"
import { KanbanColumn } from "../../components/Kanban"
import MainTitle from "../../components/Title/MainTitle"
import { useSecureApi } from "../../provider/utils/secureApiContext"
import toast from "react-hot-toast"
import CircleLoading from "../../components/Loading"
import { CardKanbanType } from "../../types/global"

const breadcrumbItems = [
  {
    label: "Fabrication",
  },
  {
    label: "Kanban Board"
  }
]

export default function KanbanPage() {
  return (
    <>
      <AuthenticatedLayout>
        <KanbanImpl />
      </AuthenticatedLayout>
    </>
  )
}

interface KanbanType {
  queue: CardKanbanType[]
  progress: CardKanbanType[]
  done: CardKanbanType[]
}

function KanbanImpl() {
  const { secureApi } = useSecureApi()
  const [kanbans, setKanbans] = useState<KanbanType>({
    queue: [],
    progress: [],
    done: []
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)

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
    } finally {
      setIsLoading(false)
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

        {!isLoading ? (
          <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-3">
            <KanbanColumn title="Queue" color="bg-red-500" cards={kanbans.queue} />

            <KanbanColumn title="On Progress" color="bg-yellow-400" cards={kanbans.progress} />

            <KanbanColumn title="Done" color="bg-green-500" cards={kanbans.done} />
          </div>
        ) : (
          <CircleLoading className="h-[calc(100vh-16rem)]" />
        )}
      </div>
    </>
  )
}