export type PartType = {
    id?: number
    partNumber: string
    partName: string
    quantity?: number
    quantityReq?: number
    createdAt?: string
    updatedAt?: string
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