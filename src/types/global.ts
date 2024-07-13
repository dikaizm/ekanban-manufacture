export type PartType = {
    partNumber: string
    partName: string
    quantity?: number
}

export type PartKanbanType = {
    id: number
    partNumber: string
    partName: string
    quantity: number
    plannedStart: string
    status: "queue" | "in_progress" | "done"
}