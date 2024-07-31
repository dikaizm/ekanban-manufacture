import { ReactNode, useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { SidebarProvider } from "../provider/SidebarProvider";
import { useToggleSidebar } from "../provider/utils/sidebarContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { SecureApiProvider } from "../provider/SecureApiProvider";

interface AuthenticatedLayoutType {
  children: ReactNode
  className?: string
}

export default function AuthenticatedLayout({ children, className }: AuthenticatedLayoutType) {
  const navigate = useNavigate()

  if (!localStorage.getItem('sidebarSubitem')) {
    localStorage.setItem('sidebarSubitem', JSON.stringify({ assemblyLine: false, assemblyStore: false, fabrication: false }))
  }

  if (!localStorage.getItem('sidebar')) {
    localStorage.setItem('sidebar', 'true')
  }

  useEffect(() => {
    const authToken = Cookies.get('auth')
    if (!authToken) {
      return navigate('/login');
    }
  }, [navigate])

  return (
    <SecureApiProvider>
      <SidebarProvider>
        <Topbar />
        <Sidebar />

        <InsiderLayout className={className}>
          {children}
        </InsiderLayout>
      </SidebarProvider>
    </SecureApiProvider>
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