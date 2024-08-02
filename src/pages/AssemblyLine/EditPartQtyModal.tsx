import toast from "react-hot-toast"
import Modal from "../../components/Modal"
import { useSecureApi } from "../../provider/utils/secureApiContext"
import PrimaryButton from "../../components/PrimaryButton"
import InputText from "../../components/Input/InputText"
import { useEffect, useState } from "react"
import { PartType } from "../../types/global"

export default function EditPartQtyModal({ id, onClose }: { id: number, onClose?: () => void }) {
  const { secureApi } = useSecureApi()
  const [part, setPart] = useState<PartType>({} as PartType)

  async function fetchPart() {
    try {
      const response = await secureApi(`/assembly-line/part/${id}`).then(res => res.json())
      if (!response.success) {
        toast.error(response.message)
        return
      }

      setPart(response.data)

    } catch (error) {
      toast.error('Failed to fetch part data')
    }
  }

  useEffect(() => {
    fetchPart()
  }, [])

  async function handleEdit(id: number) {
    console.log("Edit", id)

    try {
      const response = await secureApi(`/assembly-line/part`, {
        method: 'PUT',
        options: {
          body: JSON.stringify({ id, quantity: part.quantity }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }).then(res => res.json())
      if (!response.success) {
        toast.error(response.message)
        return
      }

      toast.success(response.message)
      onClose && onClose()

    } catch (error) {
      toast.error('Failed to edit part')
    }
  }

  return (
    <Modal title="Edit Part Quantity" onClose={onClose}
      width="w-72"
      content={
        <form>
          <div className="flex flex-col gap-3">
            <InputText value={part.partNumber} id="partNumber" label="Part Number" placeholder="Part number" disabled={true} />
            <InputText value={part.partName} id="partName" label="Part Name" placeholder="Part name" disabled={true} />

            <InputText id="quantity" label="Quantity" placeholder="Quantity" type="number" value={part.quantity} onChange={(event) => {
              const value = event.target.value
              setPart({ ...part, quantity: parseInt(value) })
            }} />
          </div>

          <div className="flex justify-end gap-2 mt-5">
            <PrimaryButton onClick={onClose} style="outline">Cancel</PrimaryButton>
            <PrimaryButton type="submit" onClick={(event) => {
              event.preventDefault()
              handleEdit(id)
            }}>Edit</PrimaryButton>
          </div>
        </form>
      }
    />
  )
}