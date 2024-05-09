import { ReactNode } from "react"
import { MdCircle, MdClose } from "react-icons/md"

interface TooltipWindowType {
  children: ReactNode
  label: string
  color: string
  className?: string
  onClose?: () => void
}

function TooltipWindow({ children, label, color, className, onClose }: TooltipWindowType) {
  function handleColor(color: string) {
    switch (color) {
      case "blue":
        return "bg-blue-400"
      case "orange":
        return "bg-orange-400"
      case "purple":
        return "bg-purple-400"
      case "green":
        return "bg-green-400"
      case "red":
        return "bg-red-400"
      default:
        return "bg-blue-400"
    }
  }

  return (
    <div className={"absolute z-10 rounded-lg bottom-[calc(100%)] mb-4 left-1/2 -translate-x-1/2 w-60 drop-shadow-2xl " + className}>

      <div className={"flex z-10 relative items-center justify-between p-3 text-white rounded-t-lg border-t border-x " + (handleColor(color))}>
        <h4 className="text-sm font-semibold ">{label}</h4>
        <button className="w-6 h-6 p-[2px] rounded-full bg-slate-200/20">
          <MdClose className="w-full h-full" />
        </button>
      </div>

      <div className="relative z-10 bg-white border-b rounded-b-lg border-x">
        {children}
      </div>

      <button type="button" onClick={onClose} className="absolute z-0 w-[3px] h-10 -translate-x-1/2 bg-slate-600 -bottom-[22.5%] left-1/2">
        <MdCircle className="absolute w-3 h-3 -translate-x-1/2 text-slate-600 -bottom-2 left-1/2" />
      </button>
    </div>
  )
}

export default TooltipWindow