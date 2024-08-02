import { MdClose, MdEditSquare } from "react-icons/md";
import MainTitle, { TitleSize } from "./Title/MainTitle";
import { ReactNode } from "react";

interface ModalType {
  title: string
  content: ReactNode
  onClose?: () => void;
  width?: string
}

export default function Modal({ title, content, onClose, width }: ModalType) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="absolute w-full h-full bg-black/30" />

      <div className={"relative max-h-[32rem] bg-white rounded-xl " + (width ? width : "w-[32rem]")}>
        {/* Row header */}
        <div className="flex justify-between px-4 py-3">
          {/* Row icon & title */}
          <div className="flex items-center gap-3">
            <div className="p-[0.4rem] border border-slate-400 rounded-full">
              <MdEditSquare className="w-5 h-5 text-blue-500" />
            </div>
            <MainTitle textSize={TitleSize.small}>{title}</MainTitle>
          </div>

          {/* Close button */}
          <button className="flex items-center justify-center w-8 h-8 p-1 text-gray-500 border rounded-full hover:bg-slate-200" onClick={onClose}>
            <MdClose className="w-5 h-5" />
          </button>
        </div>

        <hr />

        {/* Content */}
        <div className='p-4 overflow-y-auto max-h-[32rem]'>
          {content}
        </div>

      </div>
    </div>
  )
}