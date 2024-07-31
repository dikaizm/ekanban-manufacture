import AuthenticatedLayout from "../../components/AuthenticatedLayout"
import Breadcrumb from "../../components/Breadcrumb"
import PrimaryButton from "../../components/PrimaryButton"
import Table from "../../components/Table"
import MainTitle from "../../components/Title/MainTitle"

const breadcrumbItems = [
  {
    label: "Fabrication",
  },
  {
    label: "Shop Floor"
  }
]

const shopHead = {
  partNumber: "Part Number",
  partName: "Part Name",
  planStart: "Plan Start",
  planFinish: "Plan Finish",
  actualStart: "Actual Start",
  actualFinish: "Actual Finish",
  timeRemaining: "Time Remaining",
  station: "Station"
}

const shopBody = [
  {
    partNumber: "asdhasidha",
    partName: "Part 1",
    planStart: "2021-08-01 08:00",
    planFinish: "2021-08-01 10:00",
    actualStart: "2021-08-01 08:30",
    actualFinish: "2021-08-01 10:30",
    timeRemaining: "30 minutes",
    station: "Station 1"
  },
  {
    partNumber: "jabduyq",
    partName: "Part 2",
    planStart: "2021-08-01 08:00",
    planFinish: "2021-08-01 10:00",
    actualStart: "2021-08-01 08:30",
    actualFinish: "2021-08-01 10:30",
    timeRemaining: "30 minutes",
    station: "Station 2"
  }
]

function ShopFloorPage() {
  return (
    <AuthenticatedLayout>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <MainTitle>Shop Floor</MainTitle>
          <PrimaryButton>Download</PrimaryButton>
        </div>

        <Table head={shopHead} body={shopBody} actions={[
          {
            label: "Start",
            color: "bg-purple-500",
            onClick: () => {
              console.log("Start")
            }
          },
          {
            label: "Finish",
            color: "bg-green-500",
            onClick: () => {
              console.log("Finish")
            }
          }
        ]} />
      </div>
    </AuthenticatedLayout>
  )
}

export default ShopFloorPage