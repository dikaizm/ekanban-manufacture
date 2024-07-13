import { useState } from "react"
import InputText from "../../components/InputText"
import PrimaryButton from "../../components/PrimaryButton"
import MainTitle, { TitleSize } from "../../components/Title/MainTitle"
import { MdClose, MdEditSquare } from "react-icons/md"

interface CreateOrderModalType {
  onClose?: () => void
}

function CreateOrderModal({ onClose }: CreateOrderModalType) {
  // Error states
  const [partNumberError, setPartNumberError] = useState<string>('')
  const [partNameError, setPartNameError] = useState<string>('')
  const [quantityError, setQuantityError] = useState<string>('')

  const inputValidation = (partNumber: string, partName: string, quantity: string) => {
    if (!partNumber) {
      setPartNumberError('Part number is required')
    }
    if (!partName) {
      setPartNameError('Part name is required')
    }
    if (!quantity) {
      setQuantityError('Quantity is required')
    }

    if (!partNumber || !partName || !quantity) {
      return
    }
  }

  const handleCreateOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const partNumber = (e.currentTarget.elements.namedItem('partNumber') as HTMLInputElement).value
    const partName = (e.currentTarget.elements.namedItem('partName') as HTMLInputElement).value
    const quantity = (e.currentTarget.elements.namedItem('quantity') as HTMLInputElement).value

    // Validation
    inputValidation(partNumber, partName, quantity)

    console.log({ partNumber, partName, quantity })

    // Close modal
    onClose && onClose()
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="absolute w-full h-full bg-black/30"></div>

      <div className="relative max-h-[32rem] bg-white rounded-xl w-[32rem]">
        {/* Row header */}
        <div className="flex justify-between px-4 py-3">
          {/* Row icon & title */}
          <div className="flex items-center gap-3">
            <div className="p-[0.4rem] border border-slate-400 rounded-full">
              <MdEditSquare className="w-5 h-5 text-blue-500" />
            </div>
            <MainTitle textSize={TitleSize.small}>Create Order</MainTitle>
          </div>

          {/* Close button */}
          <button className="flex items-center justify-center w-8 h-8 p-1 text-gray-500 border rounded-full hover:bg-slate-200" onClick={onClose}>
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        <hr />

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[28rem]">
          <form onSubmit={handleCreateOrder}>
            <div className="flex flex-col gap-3">
              <InputText id="partNumber" label="Part Number" placeholder="Part number" error={{ value: partNumberError, setValue: setPartNumberError }} />

              <InputText id="partName" label="Part Name" placeholder="Part name" error={{ value: partNameError, setValue: setPartNameError }} />

              <InputText id="quantity" label="Quantity" placeholder="Quantity" type="number" error={{ value: quantityError, setValue: setQuantityError }} />

            </div>

            <div className="flex justify-end gap-2 mt-5">
              <PrimaryButton onClick={onClose} style="outline">Cancel</PrimaryButton>
              <PrimaryButton type="submit">Create</PrimaryButton>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateOrderModal