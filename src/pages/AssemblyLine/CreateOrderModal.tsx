import { ChangeEvent, useEffect, useState } from "react"
import InputText from "../../components/Input/InputText"
import PrimaryButton from "../../components/PrimaryButton"
import MainTitle, { TitleSize } from "../../components/Title/MainTitle"
import { MdClose, MdEditSquare } from "react-icons/md"
import InputSelect from "../../components/Input/InputSelect"
import { PARTS } from "../../types/const"

interface CreateOrderModalType {
  onClose?: () => void
}

function CreateOrderModal({ onClose }: CreateOrderModalType) {
  const [step, setStep] = useState<number>(0)

  const [partName, setPartName] = useState<string>('')
  const [partNumber, setPartNumber] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('')

  const encodedQRData = encodeURIComponent(JSON.stringify({ partName, partNumber, quantity }))

  // Error states
  const [partNameError, setPartNameError] = useState<string>('')
  const [partNumberError, setPartNumberError] = useState<string>('')
  const [quantityError, setQuantityError] = useState<string>('')

  const inputValidation = () => {
    if (!partName) {
      setPartNameError('Part name is required')
    }
    if (!partNumber) {
      setPartNumberError('Part number is required')
    }
    if (!quantity) {
      setQuantityError('Quantity is required')
    }

    if (!partName || !quantity || !partNumber) {
      return false
    }
    return true
  }

  const handleCreateOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validation
    if (!inputValidation()) return

    setStep(1)
  }

  function handleQuantity(event: ChangeEvent<HTMLInputElement>) {
    setQuantity(event.target.value)
  }

  useEffect(() => {
    const partName = PARTS.find(part => part.partNumber === partNumber)?.partName
    setPartName(partName || '')
    setPartNumberError('')
  }, [partNumber])

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

        <div className="flex items-center justify-between gap-2 px-20 py-6">
          <div className={"px-2 py-1 text-sm text-white rounded-full whitespace-nowrap " + (step === 0 ? 'bg-green-500 ' : 'bg-blue-500 ')}>
            <span>Order Part</span>
          </div>

          <div className="w-full h-1 bg-blue-100 rounded-full"></div>

          <div className={"px-2 py-1 text-sm rounded-full whitespace-nowrap " + (step === 1 ? 'bg-green-500 text-white ' : 'bg-slate-200 ')}>
            <span>Generate QR</span>
          </div>
        </div>

        {/* Content */}

        {/* Order Part */}
        {step === 0 && (
          <div className="p-4 overflow-y-auto max-h-[32rem]">
            <form onSubmit={handleCreateOrder}>
              <div className="flex flex-col gap-3">
                <InputSelect value={partName} id="partName" label="Part Name" onChange={(e) => {
                  setPartName(e.target.value)
                  setPartNumber(e.target.value)
                }} options={PARTS.map(part => ({ value: part.partNumber, label: part.partName }))} error={{ value: partNameError, setValue: setPartNameError }} />

                <InputText value={partNumber} id="partNumber" label="Part Number" placeholder="Part number" disabled={true} error={{ value: partNumberError, setValue: setPartNameError }} />

                <InputText id="quantity" label="Quantity" placeholder="Quantity" type="number" value={quantity} onChange={handleQuantity} error={{ value: quantityError, setValue: setQuantityError }} />
              </div>

              <div className="flex justify-end gap-2 mt-5">
                <PrimaryButton onClick={onClose} style="outline">Cancel</PrimaryButton>
                <PrimaryButton type="submit">Next</PrimaryButton>
              </div>
            </form>
          </div>
        )}

        {/* Generate QR */}
        {step === 1 && (
          <div className="p-4 overflow-y-auto max-h-[32rem]">
            <div className="flex flex-col items-center gap-4">
              <img
                className="w-60"
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodedQRData}`}
                alt="QR Code"
              />
              <p>QR Code</p>
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <PrimaryButton onClick={() => {
                setStep(0)
              }} style="outline">Back</PrimaryButton>
              <PrimaryButton type="button" onClick={() => {
                onClose && onClose()
              }}>Create</PrimaryButton>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateOrderModal