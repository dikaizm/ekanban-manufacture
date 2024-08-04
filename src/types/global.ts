export type PartType = {
    id?: number
    partNumber: string
    partName: string
    quantity?: number
    quantityReq?: number
    createdAt?: string
    updatedAt?: string
}

export interface KanbanType {
    queue: CardKanbanType[]
    progress: CardKanbanType[]
    done: CardKanbanType[]
}

export type CardKanbanType = {
    id: string
    cardId: string
    partNumber: string
    partName: string
    quantity: number
    planStart: string
    status: "queue" | "progress" | "done"
    type: "production" | "withdrawal"
    orderId: string
}

export type QRKanbanCardType = {
    id: string
    type: "production" | "withdrawal"
    cardId: string
    qrCode: string
    partNumber: string[]
    partName: string
    orderDate: string
    finishDate: string
    quantity: number
    prevStation?: string
    nextStation?: string
    status: "queue" | "progress" | "done"
    stationName: string
}

export type ModalQRPassType = {
    id: string
    type: "production" | "withdrawal"
}

export interface UserType {
    name: string
    email: string
    role: string
}

export interface OrderStoreType {
    id: number
    orderId: number
    kanbanId: string
    partNumber: string
    partName: string
    quantity: number
    stock: number
    status: "pending" | "production" | "deliver" | "finish"
    createdAt?: string
    updatedAt?: string
}

export interface PartStoreType {
    id: number
    partNumber: string
    partName: string
    stock: number
    status: "order_to_fabrication" | "finish"
    createdAt?: string
    updatedAt?: string
}