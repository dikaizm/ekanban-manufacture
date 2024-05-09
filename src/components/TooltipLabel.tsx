import { ReactNode } from "react"
import { BsTriangleFill } from "react-icons/bs"

interface TooltipLabelType {
  children: ReactNode
}

export default function TooltipLabel({ children }: TooltipLabelType) {
  return (
    <div className="absolute z-30 rounded-lg bg-white bottom-[calc(100%)] mb-4 left-1/2 -translate-x-1/2 drop-shadow-xl">
      <div className="p-2">
        <h4 className="text-sm font-semibold text-center">{children}</h4>
      </div>
      <BsTriangleFill className="absolute w-3 h-3 text-white transform rotate-180 -translate-x-1/2 -bottom-2 left-1/2" />
    </div>
  )
}
