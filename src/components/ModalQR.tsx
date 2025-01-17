import { useEffect, useRef, useState } from "react"
import { useModalQR } from "../provider/utils/modalQRContext"
import { QRKanbanCardType } from "../types/global"
import PrimaryButton from "./PrimaryButton"
import MainTitle from "./Title/MainTitle"
import { MdClose, MdQrCode } from "react-icons/md"
import { useReactToPrint } from "react-to-print"
import toast from "react-hot-toast"
import { useSecureApi } from "../provider/utils/secureApiContext"
import { SecureApiProvider } from "../provider/SecureApiProvider"
import CircleLoading from "./Loading"
import { TitleSize } from "../types/const"

interface ModalQRType {
  id?: string
  type?: "production" | "withdrawal"
}

export default function ModalQR({ id, type = 'production' }: ModalQRType) {
  return (
    <SecureApiProvider>
      <ModalQRImpl id={id} type={type} />
    </SecureApiProvider>
  )
}

function ModalQRImpl({ id, type = "production" }: ModalQRType) {
  const { closeModalQR, updateModalQR } = useModalQR()
  const { secureApi } = useSecureApi()
  const [data, setData] = useState<QRKanbanCardType>()

  async function fetchData() {

    try {
      const response = await secureApi(`/kanban/${id}`).then(res => res.json())
      if (!response.success) {
        toast.error(response.message)
        return
      }

      setData(response.data)

    } catch (error) {
      toast.error('Failed to fetch data')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  const color = type === "production" ? "bg-green-300" : "bg-yellow-300"

  const contentToPrint = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    documentTitle: "kanban-card_" + data?.cardId + "_" + type,
    content: () => contentToPrint.current,
    removeAfterPrint: true,
  })

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleKeyDown = (event: any) => {
      if (event.key === 'Escape') {
        closeModalQR();
      }
    };

    document.body.classList.add('no-scroll');
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModalQR]);

  async function handleConfirm() {
    const toastId = toast.loading('Confirming kanban...');

    let kanbanStatus = '';
    if (data?.status === 'queue') {
      kanbanStatus = 'progress'
    } else if (data?.status === 'progress') {
      kanbanStatus = 'done'
    } else if (data?.status === 'done') {
      toast.success('Kanban status already done')
    }

    try {
      const response = await secureApi('/kanban/confirm', {
        method: 'PUT',
        options: {
          body: JSON.stringify({
            id: data?.id,
            status: kanbanStatus
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }).then(res => res.json())
      if (!response.success) {
        throw new Error(response.message || 'Confirm kanban error');
      }

      toast.success(response.message || 'Kanban confirmed successfully', { id: toastId });

      updateModalQR();
      closeModalQR();

    } catch (error) {
      console.error('Confirm kanban error:', error);
      toast.error(error instanceof Error ? error.message : 'Confirm kanban error', { id: toastId });
    }
  }

  async function handleDelete() {
    try {
      const response = await secureApi(`/assembly-line/order/${data?.orderId}`, {
        method: 'DELETE', options: {}
      }).then(res => res.json())
      if (!response.success) {
        toast.error(response.message)
        return
      }

      toast.success(response.message);

      updateModalQR();
      closeModalQR();

    } catch (error) {
      toast.error('Failed to delete kanban')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute w-full h-full bg-black/30"></div>

      <div className="relative bg-white rounded-xl w-[40rem]">
        {/* Row header */}
        <div className="flex justify-between px-4 py-3">
          {/* Row icon & title */}
          <div className="flex items-center gap-3">
            <div className="p-[0.4rem] border border-slate-400 rounded-full">
              <MdQrCode className="w-5 h-5 text-blue-500" />
            </div>
            <MainTitle textSize={TitleSize.small}>Kanban Card</MainTitle>
          </div>

          {/* Close button */}
          <button className="flex items-center justify-center w-8 h-8 p-1 text-gray-500 border rounded-full hover:bg-slate-200" onClick={closeModalQR}>
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        <hr />

        {/* Content */}

        <div ref={contentToPrint} className="p-4">

          <div className={"p-3 border-t border-x border-slate-500 " + color}>
            <h2 className="text-3xl font-bold text-center">
              {type === "production" ? "PRODUCTION" : "WITHDRAWAL"} CARD
            </h2>
          </div>

          <div className="flex justify-between border border-slate-500">
            <div className="grid w-full grid-cols-2 gap-2 p-2">
              <InfoBox label="Part No." value={data?.partNumber ? data.partNumber.join(' ') : '-'} color={color} fontSize={data?.partNumber && data.partNumber.length > 1 ? 'text-xs' : 'text-sm'} />
              <InfoBox label="Part Name" value={data?.partName || '-'} color={color} />
              <InfoBox label="Order Date" value={data?.orderDate || '-'} color={color} />
              <InfoBox label="Finish Date" value={data?.finishDate || '-'} color={color} />

              {type === "production" ? (
                <InfoBox label="Quantity" value={data?.quantity} color={color} />
              ) : (
                <>
                  <div className="grid grid-cols-[24%_auto]">
                    <InfoBox label="Qty" value={data?.quantity} color={color} />
                    <InfoBox label="Previous Process" value={data?.prevStation || '-'} color={color} />
                  </div>
                  <InfoBox label="Next Process" value={data?.nextStation || '-'} color={color} />
                </>
              )}

            </div>

            <div className="flex flex-col w-64 border-l border-slate-500">
              <div className="flex flex-col items-center p-4">
                {data?.qrCode ? (
                  <img src={data?.qrCode} alt="QR Code" />
                ) : (
                  <CircleLoading className="h-32" />
                )}
                <span className="mt-3 text-sm">Scan to confirm</span>
              </div>
              <div className="bg-slate-500 h-[0.8pt]"></div>
              <div className="p-2 text-sm">
                <span className="font-semibold">Card ID: </span>
                {data?.cardId || '-'}
              </div>
            </div>
          </div>

        </div>

        <hr />

        {/* Footer */}
        <div className="flex justify-between gap-2 px-4 py-3">
          <PrimaryButton onClick={closeModalQR} style="outline">Close</PrimaryButton>
          <div className="flex gap-2">
            {(data?.status === 'queue' && data.stationName === 'assembly_line') && (<PrimaryButton className="bg-red-500" onClick={handleDelete}>Delete</PrimaryButton>)}

            <PrimaryButton style="outline" onClick={handlePrint}>Print</PrimaryButton>
            {((data?.status === 'queue' && data.stationName !== 'assembly_line') || data?.status === 'progress') && (
              <PrimaryButton onClick={handleConfirm}>Next</PrimaryButton>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

interface InfoBoxType {
  label: string
  value?: string | number
  color: string
  fontSize?: string
}

function InfoBox({ label, value, color, fontSize }: InfoBoxType) {
  return (
    <div className="flex flex-col text-center border h-18 border-slate-500">
      <div className={"p-1 font-semibold w-full " + color}>{label}</div>
      <div className={"w-full px-2 py-2 " + fontSize} style={{ color: color }}>{value}</div>
    </div>
  )
}