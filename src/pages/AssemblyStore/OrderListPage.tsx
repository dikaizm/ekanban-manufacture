import AuthenticatedLayout from "../../components/AuthenticatedLayout"
import Breadcrumb from "../../components/Breadcrumb"
import PrimaryButton from "../../components/PrimaryButton"
import Table from "../../components/Table"
import MainTitle from "../../components/Title/MainTitle"

const breadcrumbItems = [
  {
    label: "Assembly Store",
  },
  {
    label: "Order List"
  }
]

const orderHead = ["Part Number", "Part Name", "Order ID", "Kanban ID", "Quantity", "Stock", "Status"]

const orderBody = [
  {
    partNumber: "asdhasidha",
    partName: "Part 1",
    orderId: "123",
    kanbanId: "K123",
    quantity: 10,
    stock: 20,
    status: "Pending"
  },
  {
    partNumber: "jabduyq",
    partName: "Part 2",
    orderId: "124",
    kanbanId: "K124",
    quantity: 20,
    stock: 30,
    status: "Completed"
  }
]

function OrderListPage() {
  return (
    <AuthenticatedLayout>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <MainTitle>Order List</MainTitle>
          <PrimaryButton>Download</PrimaryButton>
        </div>

        <Table head={orderHead} body={orderBody} actions={[
          {
            label: "Production",
            color: "bg-purple-500",
            onClick: () => {
              console.log("Production")
            }
          },
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