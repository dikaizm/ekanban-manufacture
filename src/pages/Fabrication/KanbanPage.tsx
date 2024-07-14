import AuthenticatedLayout from "../../components/AuthenticatedLayout"
import Breadcrumb from "../../components/Breadcrumb"
import { KanbanColumn } from "../../components/Kanban"
import MainTitle from "../../components/Title/MainTitle"

const breadcrumbItems = [
  {
    label: "Fabrication",
  },
  {
    label: "Kanban Board"
  }
]

export default function KanbanPage() {
  return (
    <>
      <AuthenticatedLayout>
        <Breadcrumb items={breadcrumbItems} />

        <div className="p-6">
          <MainTitle>Kanban Board</MainTitle>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <KanbanColumn title="Queue" color="bg-red-500" parts={[
              {
                id: "adaoks",
                partNumber: "asdhad asd ads asidha",
                partName: "Part 1",
                quantity: 10,
                plannedStart: "2021-09-01",
                status: "queue"
              },
              {
                id: "asdof",
                partNumber: "jabduyq",
                partName: "Part 2",
                quantity: 20,
                plannedStart: "2021-09-02",
                status: "queue"
              }
            ]} type={"production"} />

            <KanbanColumn title="On Progress" color="bg-yellow-400" parts={[
              {
                id: "ajdoiajd",
                partNumber: "asdhad asd ads asidha",
                partName: "Part 1",
                quantity: 10,
                plannedStart: "2021-09-01",
                status: "queue"
              },
              {
                id: "adsjaos",
                partNumber: "jabduyq",
                partName: "Part 2",
                quantity: 20,
                plannedStart: "2021-09-02",
                status: "queue"
              }
            ]} type={"production"} />

            <KanbanColumn title="Done" color="bg-green-500" parts={[
              {
                id: "oaids",
                partNumber: "asdhad asd ads asidha",
                partName: "Part 1",
                quantity: 10,
                plannedStart: "2021-09-01",
                status: "queue"
              },
              {
                id: "asdh",
                partNumber: "jabduyq",
                partName: "Part 2",
                quantity: 20,
                plannedStart: "2021-09-02",
                status: "queue"
              }
            ]} type={"production"} />
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  )
}