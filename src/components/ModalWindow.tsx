import { ReactNode } from "react"
import { useToggleTooltip } from "../context/utils/tooltipContext"

export default function ModalWindow() {
  const { tooltipDispatch } = useToggleTooltip()

  return (
    <div className="absolute bg-white border rounded-lg top-4 left-4 drop-shadow-xl">
      <h4 className="px-4 pt-4 text-base font-semibold">Komponen Sensor</h4>

      <div className="flex flex-col p-2">
        <SensorItem onClick={() => {
          tooltipDispatch({ type: "CLICK_conveyor" })
        }} color="purple">Conveyor</SensorItem>
        <SensorItem onClick={() => {
          tooltipDispatch({ type: "CLICK_camera" })
        }} color="blue">Camera Inspection</SensorItem>
        <SensorItem onClick={() => {
          tooltipDispatch({ type: "CLICK_photoelectric" })
        }} color="orange">Photoelectric Sensor</SensorItem>
      </div>
      
    </div>
  )
}

interface SensorItemType {
  children: ReactNode
  color: string
  onClick: () => void
}

function SensorItem({ children, color, onClick }: SensorItemType) {
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-100">
      <div className={`w-5 h-5 rounded-full bg-${color}-400`}></div>
      <p className="text-sm font-medium text-slate-700">{children}</p>
    </button>
  )
}