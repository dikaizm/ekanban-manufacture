import { useModalQR } from "../provider/utils/modalQRContext"
import { QRKanbanCardType } from "../types/global"
import MainTitle, { TitleSize } from "./Title/MainTitle"
import { MdClose, MdQrCode } from "react-icons/md"

interface ModalQRType {
  data?: QRKanbanCardType
}

export default function ModalQR({ data }: ModalQRType) {
  const { closeModalQR } = useModalQR()

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="absolute w-full h-full bg-black/30"></div>

      <div className="relative max-h-[32rem] bg-white rounded-xl w-[32rem]">
        {/* Row header */}
        <div className="flex justify-between px-4 py-3">
          {/* Row icon & title */}
          <div className="flex items-center gap-3">
            <div className="p-[0.4rem] border border-slate-400 rounded-full">
              <MdQrCode className="w-5 h-5 text-blue-500" />
            </div>
            <MainTitle textSize={TitleSize.small}>Production Kanban</MainTitle>
          </div>

          {/* Close button */}
          <button className="flex items-center justify-center w-8 h-8 p-1 text-gray-500 border rounded-full hover:bg-slate-200" onClick={closeModalQR}>
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        <hr />

        {/* Content */}

        <div className="p-4">
          {data?.partName}
        </div>
      </div>
    </div>
  )
}