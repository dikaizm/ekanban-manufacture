import { FaBoxOpen } from "react-icons/fa6"
import { useModalQR } from "../provider/utils/modalQRContext"
import { CardKanbanType } from "../types/global"

interface KanbanColumnType {
    title: string
    color?: string
    cards: CardKanbanType[]
}

export function KanbanColumn({ title, color = "bg-red-500", cards }: KanbanColumnType) {
    return (
        <div className="flex flex-col gap-4 border rounded-lg bg-slate-100 h-fit">
            <div className="overflow-hidden bg-white rounded-t-lg">
                <div className={"h-2 " + color}></div>
                <h3 className="p-2 text-lg font-semibold text-center ">{title}</h3>
            </div>
            <div className="flex flex-col gap-3 px-2 pb-2">
                {cards && cards.map(card => (
                    <KanbanCard key={card.id} card={card} color={color} />
                ))}
                {cards.length === 0 && (
                    <>
                        <FaBoxOpen className="w-10 h-10 mx-auto text-gray-300" />
                        <div className="mb-4 text-center text-gray-400">No data</div>
                    </>
                )}
            </div>
        </div>
    )
}

interface KanbanCardType {
    card: CardKanbanType
    color?: string
}

function KanbanCard({ card, color = "bg-red-500" }: KanbanCardType) {
    const { openModalQR } = useModalQR()

    return (
        <button onClick={() => {
            openModalQR({
                id: card.id,
                type: card.type,
            })
        }} type="button" className="relative flex overflow-hidden transition-shadow duration-500 bg-white rounded-lg shadow hover:shadow-2xl">
            <div className={"w-1 absolute left-0 h-full " + color}></div>
            <div className="w-full p-4">
                <div className="px-1 py-[0.125rem] mb-2 text-xs border rounded-full w-fit bg-slate-100">ID {card.orderId}</div>
                <div className="flex flex-col gap-2">
                    <CardRow label="Part Name" value={card.partName} />
                    <hr />
                    <CardRow label="Part Number" value={card.partNumber} />
                    <hr />
                    <CardRow label="Quantity" value={card.quantity.toString()} />
                    <hr />
                    <CardRow label="Plan Start" value={card.planStart} />
                </div>
            </div>
        </button>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CardRow({ label, value }: { label: string, value: any }) {
    return (
        <div className="grid grid-cols-[38%_auto] gap-2">
            <div className="text-sm font-semibold text-start">{label}</div>
            <div className="text-sm text-start">{value || '-'}</div>
        </div>
    )
}