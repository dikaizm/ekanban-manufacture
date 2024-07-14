import { ReactNode, useState } from "react"
import { SidebarContext } from "./utils/sidebarContext"

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [value, setValue] = useState<boolean>(
        localStorage.getItem('sidebar') === 'true' ? true : false
    )

    function updateValue(newValue: boolean) {
        localStorage.setItem('sidebar', newValue.toString())
        setValue(newValue)
    }

    return (
        <SidebarContext.Provider value={{ isSidebarOpen: value, toggleSidebar: updateValue }}>
            {children}
        </SidebarContext.Provider>
    )
}