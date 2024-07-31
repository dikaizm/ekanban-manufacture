import { useModalQR } from "../provider/utils/modalQRContext"
import { PartKanbanType } from "../types/global"

interface KanbanColumnType {
    title: string
    color?: string
    parts: PartKanbanType[]
    type: "production" | "withdrawal"
}

export function KanbanColumn({ title, color = "bg-red-500", parts, type }: KanbanColumnType) {
    return (
        <div className="flex flex-col gap-4 border rounded-lg bg-slate-100">
            <div className="overflow-hidden bg-white rounded-t-lg">
                <div className={"h-2 " + color}></div>
                <h3 className="p-2 text-lg font-semibold text-center ">{title}</h3>
            </div>
            <div className="flex flex-col gap-3 px-2 pb-2">
                {parts.map(part => (
                    <KanbanCard key={part.id} part={part} color={color} type={type} />
                ))}
            </div>
        </div>
    )
}

interface KanbanCardType {
    part: PartKanbanType
    color?: string
    type: "production" | "withdrawal"
}

function KanbanCard({ part, color = "bg-red-500", type }: KanbanCardType) {
    const { openModalQR } = useModalQR()

    return (
        <button onClick={() => {
            openModalQR({
                type: type,
                cardId: part.id,
                qrCode: "1234567890",
                partName: part.partName,
                partNumber: part.partNumber,
                orderDate: "2021-10-10",
                finishDate: "2021-10-20",
                quantity: part.quantity,
            })
        }} type="button" className="flex overflow-hidden transition-shadow duration-500 bg-white rounded-lg shadow hover:shadow-2xl">
            <div className={"w-1 h-full " + color}></div>
            <div className="w-full p-4">
                <div className="flex flex-col gap-2">
                    <CardRow label="Part Name" value={part.partName} />
                    <hr />
                    <CardRow label="Part Number" value={part.partNumber} />
                    <hr />
                    <CardRow label="Quantity" value={part.quantity.toString()} />
                    <hr />
                    <CardRow label="Plan Start" value={part.plannedStart} />
                </div>
            </div>
        </button>
    )
}

function CardRow({ label, value }: { label: string, value: string }) {
    return (
        <div className="grid grid-cols-[38%_auto] gap-2">
            <div className="text-sm font-semibold text-start">{label}</div>
            <div className="text-sm text-start">{value}</div>
        </div>
    )
}