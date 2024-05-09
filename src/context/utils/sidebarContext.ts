import { createContext, useContext } from "react"

interface SidebarContextType {
    isSidebarOpen: boolean
    toggleSidebar: (value: boolean) => void
}

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useToggleSidebar() {
    const context = useContext(SidebarContext)
    if (!context) {
        throw new Error('useToggleSidebar must be used within SidebarProvider')
    }
    return context
}