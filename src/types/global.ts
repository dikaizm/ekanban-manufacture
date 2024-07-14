export type PartType = {
    partNumber: string
    partName: string
    quantity?: number
}

export type PartKanbanType = {
    id: string
    partNumber: string
    partName: string
    quantity: number
    plannedStart: string
    status: "queue" | "in_progress" | "done"
}

export type QRKanbanCardType = {
    type: "production" | "withdrawal"
    cardId: string
    qrCode: string
    partNumber: string
    partName: string
    orderDate: string
    finishDate: string
    quantity: number
    previousProcess?: string
    nextProcess?: string
}