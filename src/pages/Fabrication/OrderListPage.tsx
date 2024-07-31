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
    label: "Order List"
  }
]

const orderHead = {
  partNumber: "Part Number",
  partName: "Part Name",
  kanbanId: "Kanban ID",
  status: "Status"
}

const orderBody = [
  {
    partNumber: "asdhasidha",
    partName: "Part 1",
    kanbanId: "K123",
    status: "Pending"
  },
  {
    partNumber: "jabduyq",
    partName: "Part 2",
    kanbanId: "K124",
    status: "Completed"
  }
]

function OrderListPage() {
  return (
    <AuthenticatedLayout>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <MainTitle>Order List</MainTitle>
          <PrimaryButton>Download</PrimaryButton>
        </div>

        <Table head={orderHead} body={orderBody} actions={[
          {
            label: "Deliver",
            color: "bg-green-500",
            onClick: () => {
              console.log("Deliver")
            }
          }
        ]} />
      </div>
    </AuthenticatedLayout>
  )
}

export default OrderListPage