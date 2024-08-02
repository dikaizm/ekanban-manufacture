import { useEffect, useState } from "react"
import AuthenticatedLayout from "../../components/AuthenticatedLayout"
import Breadcrumb from "../../components/Breadcrumb"
import { KanbanColumn } from "../../components/Kanban"
import ModalQR from "../../components/ModalQR"
import MainTitle from "../../components/Title/MainTitle"
import { useModalQR } from "../../provider/utils/modalQRContext"
import CircleLoading from "../../components/Loading"

const breadcrumbItems = [
  {
    label: "Assembly Line",
  },
  {
    label: "Kanban Board"
  }
]

export default function KanbanPage() {
  const { isModalQRVisible, modalQRData, modalQRType } = useModalQR()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)

    if (isModalQRVisible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    // Cleanup function to remove the class when the component unmounts
    return () => document.body.classList.remove('no-scroll');
  }, [isModalQRVisible]);

  return (
    <>
      <AuthenticatedLayout>
        <Breadcrumb items={breadcrumbItems} />

        <div className="p-4 sm:p-6">
          <MainTitle>Kanban Board</MainTitle>

          {!isLoading ? (
            <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-3">
              <KanbanColumn title="Queue" color="bg-red-500" parts={[

              ]} type={"production"} />

              <KanbanColumn title="On Progress" color="bg-yellow-400" parts={[

              ]} type={"withdrawal"} />

              <KanbanColumn title="Done" color="bg-green-500" parts={[

              ]} type={"withdrawal"} />
            </div>
          ) : (
            <CircleLoading className="h-[calc(100vh-16rem)]" />
          )}

        </div>
      </AuthenticatedLayout>

      {isModalQRVisible && (
        <ModalQR
          id={modalQRData?.id}
          type={modalQRType}
        />
      )}
    </>
  )
}