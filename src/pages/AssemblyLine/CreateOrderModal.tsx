import { ChangeEvent, useEffect, useState } from "react"
import InputText from "../../components/Input/InputText"
import PrimaryButton from "../../components/PrimaryButton"
import MainTitle from "../../components/Title/MainTitle"
import { MdClose, MdEditSquare } from "react-icons/md"
import InputSelect from "../../components/Input/InputSelect"
import { PARTS, TitleSize } from "../../types/const"
import { FaCircleCheck } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import { useSecureApi } from "../../provider/utils/secureApiContext"

interface CreateOrderModalType {
  onClose?: () => void
}

function CreateOrderModal({ onClose }: CreateOrderModalType) {
  const navigate = useNavigate()
  const { secureApi } = useSecureApi()
  const [step, setStep] = useState<number>(0)

  const [partName, setPartName] = useState<string>('')
  const [partNumber, setPartNumber] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('')

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

  const handleCreateOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validation
    if (!inputValidation()) return

    const response = await secureApi('/assembly-line/order', {
      method: 'POST',
      options: {
        body: JSON.stringify({ partNumber, quantity }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    }).then(res => res.json())

    if (response.success) {
      setStep(1)
    }
  }

  function handleQuantity(event: ChangeEvent<HTMLInputElement>) {
    setQuantity(event.target.value)
  }

  useEffect(() => {
    const partName = PARTS.find(part => part.partNumber === partNumber)?.partName
    setPartName(partName || '')
    setPartNumberError('')
  }, [partNumber])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleKeyDownOrder = (event: any) => {
      if (event.key === 'Escape') {
        onClose && onClose();
      }
    };

    document.body.classList.add('no-scroll');
    document.addEventListener('keydown', handleKeyDownOrder);

    // Clean up the event listener when the component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', handleKeyDownOrder);
    };
  }, [onClose, step]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
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
                <PrimaryButton type="submit">Create</PrimaryButton>
              </div>
            </form>
          </div>
        )}

        {/* Generate QR */}
        {step === 1 && (
          <div className="p-4 overflow-y-auto">
            <div className="flex flex-col items-center gap-4">
              <div>
                <FaCircleCheck className="w-16 h-16 text-green-500" />
              </div>
              <p className="font-semibold">Order created successfully</p>
            </div>

            <div className="flex justify-center gap-2 mt-5">
              <PrimaryButton type="button" onClick={() => {
                const asmLinePath = '/dashboard/assembly-line/kanban'
                if (window.location.pathname === asmLinePath) {
                  location.reload()
                } else {
                  navigate(asmLinePath)
                }

                onClose && onClose()
              }}>Open Kanban</PrimaryButton>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateOrderModal