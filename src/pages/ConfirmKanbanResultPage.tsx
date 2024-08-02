import { IoCheckmarkCircle } from "react-icons/io5";
import AuthenticatedLayout from "../components/AuthenticatedLayout";
import { useNavigate } from "react-router-dom";

export default function ConfirmKanbanResultPage() {
  const navigate = useNavigate()

  return (
    <AuthenticatedLayout showSidebar={false}>
      <div className="flex flex-col items-center justify-center w-full p-4 sm:p-6 h-[calc(100vh-4rem)]">
        <IoCheckmarkCircle className="w-20 h-20 text-green-500" />
        <h1 className="mt-2 text-2xl font-bold">Success</h1>
        <p>Confirm kanban success</p>

        <button className="px-4 py-2 mt-8 text-white bg-blue-500 rounded-md" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </AuthenticatedLayout>
  )
}