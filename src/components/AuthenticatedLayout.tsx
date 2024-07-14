import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { SidebarProvider } from "../provider/SidebarProvider";
import { useToggleSidebar } from "../provider/utils/sidebarContext";

interface AuthenticatedLayoutType {
  children: ReactNode
  className?: string
}

export default function AuthenticatedLayout({ children, className }: AuthenticatedLayoutType) {

  if (!localStorage.getItem('sidebarSubitem')) {
    localStorage.setItem('sidebarSubitem', JSON.stringify({ assemblyLine: false, assemblyStore: false, fabrication: false }))
  }

  if (!localStorage.getItem('sidebar')) {
    localStorage.setItem('sidebar', 'true')
  }

  return (
    <SidebarProvider>
      <Topbar />
      <Sidebar />

      <InsiderLayout className={className}>
        {children}
      </InsiderLayout>
    </SidebarProvider>
  )
}

function InsiderLayout({ children, className }: AuthenticatedLayoutType) {
  const { isSidebarOpen } = useToggleSidebar()

  return (
    <div className={"relative min-h-screen pt-16 bg-slate-50 transition-all duration-75 " + (className ? className : '') + (isSidebarOpen ? ' sm:ml-56' : ' sm:ml-[4.5rem]')}>
      {children}
    </div>
  )
}