import { useParams } from "react-router-dom";
import AuthenticatedLayout from "../components/AuthenticatedLayout";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSecureApi } from "../provider/utils/secureApiContext";
import PrimaryButton from "../components/PrimaryButton";
import { CardRow } from "../components/Kanban";

export default function ConfirmKanbanPage() {
  const { id } = useParams()

  return (
    <AuthenticatedLayout showSidebar={false}>
      <ConfirmKanbanImpl id={id!} />
    </AuthenticatedLayout>
  )
}

type KanbanType = {
  id: string
  cardId: string
  type: 'production' | 'withdrawal'
  quantity: number
  partNumber: string
  partName: string
  planStart: string
  orderDate: string
  finishDate: string
  status: string
}

function ConfirmKanbanImpl({ id }: { id: string }) {
  const { secureApi } = useSecureApi()
  const [kanban, setKanban] = useState<KanbanType>({} as KanbanType)

  async function fetchKanban() {
    try {
      const response = await secureApi(`/kanban/${id}`).then(res => res.json())
      if (!response.success) {
        toast.error(response.message)
        return
      }

      setKanban(response.data)

    } catch (error) {
      toast.error('Fetch kanban error')
    }
  }

  useEffect(() => { fetchKanban() }, [])

  async function handleConfirm() {
    toast.loading('Confirming kanban...')

    try {
      const response = await secureApi(`/kanban/confirm`, {
        method: 'PUT',
        options: {
          body: JSON.stringify({
            id: kanban.id,
            status: kanban.status
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }).then(res => res.json())
      if (!response.success) {
        toast.error(response.message)
        return
      }

      toast.dismiss()
      toast.success(response.message)
    } catch (error) {
      toast.dismiss()
      toast.error('Confirm kanban error')
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-full p-4 sm:p-6">
      <div className="bg-white border rounded-lg w-96">
        <div className="p-2">
          <h1 className="text-lg font-semibold text-center">Confirm Kanban</h1>
        </div>

        <hr />

        <div className="p-2">
          <div className="w-full overflow-hidden border rounded-lg">
            <div className={"p-2 text-white text-center uppercase font-bold " + getKanbanStatusColor(kanban.status)}>
              {kanban.status}
            </div>

            <div className="flex flex-col gap-2 p-2">
              <CardRow label="Kanban ID" value={kanban.cardId} />
              <hr />
              <CardRow label="Kanban Type" value={kanban.type} />
              <hr />
              <CardRow label="Part Name" value={kanban.partName} />
              <hr />
              <CardRow label="Part Number" value={kanban.partNumber} />
              <hr />
              <CardRow label="Quantity" value={kanban.quantity} />
              <hr />
              <CardRow label="Plan Start" value={kanban.planStart} />
              <hr />
              <CardRow label="Order Date" value={kanban.orderDate} />
              <hr />
              <CardRow label="Finish Date" value={kanban.finishDate} />
            </div>
          </div>
        </div>

        <hr />

        <div className="flex w-full p-2">
          <PrimaryButton className="justify-center w-full text-center" onClick={handleConfirm}>Proceed to {getNextStepLabel(kanban.status)}</PrimaryButton>
        </div>

      </div>
    </div>
  )
}

function getNextStepLabel(status?: string) {
  if (status === 'queue') return 'Progress'
  if (status === 'progress') return 'Done'
  return '...'
}

function getKanbanStatusColor(status?: string) {
  if (status === 'queue') return 'bg-red-500'
  if (status === 'progress') return 'bg-yellow-400'
  if (status === 'done') return 'bg-green-500'
  return 'bg-gray-500'
}