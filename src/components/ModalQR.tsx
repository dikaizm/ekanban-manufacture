import { useEffect, useRef } from "react"
import { useModalQR } from "../provider/utils/modalQRContext"
import { QRKanbanCardType } from "../types/global"
import PrimaryButton from "./PrimaryButton"
import MainTitle, { TitleSize } from "./Title/MainTitle"
import { MdClose, MdQrCode } from "react-icons/md"
import { useReactToPrint } from "react-to-print"

interface ModalQRType {
  data?: QRKanbanCardType
  color: string
  type?: "production" | "withdrawal"
}

export default function ModalQR({ data, color, type = "production" }: ModalQRType) {
  const { closeModalQR } = useModalQR()

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

    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModalQR]);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="absolute w-full h-full bg-black/30"></div>

      <div className="relative max-h-[32rem] bg-white rounded-xl w-[40rem]">
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
              <InfoBox label="Part No." value={data?.partNumber} color={color} />
              <InfoBox label="Part Name" value={data?.partName} color={color} />
              <InfoBox label="Order Date" value={data?.orderDate} color={color} />
              <InfoBox label="Finish Date" value={data?.finishDate} color={color} />

              {type === "production" ? (
                <InfoBox label="Quantity" value={data?.quantity} color={color} />
              ) : (
                <>
                  <div className="grid grid-cols-[24%_auto]">
                    <InfoBox label="Qty" value={data?.quantity} color={color} />
                    <InfoBox label="Previous Process" value={data?.quantity} color={color} />
                  </div>
                  <InfoBox label="Next Process" value={data?.quantity} color={color} />
                </>
              )}

            </div>

            <div className="flex flex-col w-64 border-l border-slate-500">
              <div className="flex flex-col items-center p-4">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=HelloWorld" alt="QR Code" />
                <span className="mt-3 text-sm">Scan to confirm</span>
              </div>
              <div className="bg-slate-500 h-[0.8pt]"></div>
              <div className="p-2 text-sm">
                <span className="font-semibold">Card ID: </span>
                {data?.cardId}
              </div>
            </div>
          </div>

        </div>

        <hr />

        {/* Footer */}
        <div className="flex justify-end gap-2 px-4 py-3">
          <PrimaryButton onClick={closeModalQR} style="outline">Close</PrimaryButton>
          <PrimaryButton onClick={() => {
            handlePrint()
          }}>Print</PrimaryButton>
        </div>

      </div>
    </div>
  )
}

interface InfoBoxType {
  label: string
  value?: string | number
  color: string
}

function InfoBox({ label, value, color }: InfoBoxType) {
  return (
    <div className="flex flex-col text-center border h-18 border-slate-500">
      <div className={"text-sm p-1 font-semibold w-full " + color}>{label}</div>
      <div className="w-full px-2 py-2" style={{ color: color }}>{value}</div>
    </div>
  )
}