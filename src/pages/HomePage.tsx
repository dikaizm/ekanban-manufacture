import { TbHeartRateMonitor } from "react-icons/tb"
import AppLogo from "../components/AppLogo"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function HomePage() {
  const navigate = useNavigate()

  const isAuthenticated: boolean = true

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="relative flex flex-col justify-between min-h-screen mx-auto bg-slate-50">
      <div className="relative flex justify-between gap-4 px-8 py-4">
        <a href="/">
          <AppLogo />
        </a>

        <div className="flex items-center gap-3">
          <a className="px-3 py-2 text-white bg-blue-500 rounded-lg" href="/login">Masuk</a>
          <a className="px-3 py-2 text-blue-500 border border-blue-500 rounded-lg" href="/register">Daftar Akun</a>
        </div>
      </div>

      <div className="flex items-center justify-center h-full px-6">
        <HomeBanner />
      </div>

      <div className="w-full py-8 text-center">
        <p className="text-sm text-slate-500">Copyright 2024</p>
      </div>
    </div>
  )

}

function HomeBanner() {
  return (
    <div className="p-8 bg-white border rounded-lg max-w-[32rem]">
      <div className="flex items-center gap-4 p-4 text-white bg-blue-500 border rounded-lg">
        <TbHeartRateMonitor className="w-10 h-10" />
        <h1 className="text-2xl font-semibold">Dashboard e-Kanban</h1>
      </div>
      <p className="mt-6">PT XYZ adalah manufaktur pesawat terbang dan helikopter untuk keperluan komersial maupun militer dengan spesialisasi di bidang aerostruktur. Selain itu, PT XYZ merupakan satu-satunya produsen pesawat di Asia Tenggara. </p>
    </div>
  )
}