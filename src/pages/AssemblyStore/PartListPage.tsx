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
    label: "Part List"
  }
]

const partHead = ["Part Number", "Part Name", "Stock", "Status"]

const partBody = [
  {
    partNumber: "P001",
    partName: "Screw",
    stock: 100,
    status: "Order to fabrication"
  },
  {
    partNumber: "P002",
    partName: "Bolt",
    stock: 50,
    status: "Order to fabrication"
  }
]

function PartListPage() {
  return (
    <AuthenticatedLayout>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-6">
        <div className="flex items-center justify-between gap-4">
          <MainTitle>Part List</MainTitle>
          <PrimaryButton>Download</PrimaryButton>
        </div>

        <Table head={partHead} body={partBody} actions={[
          {
            label: "Receive",
            color: "bg-blue-500",
            onClick: () => alert("Edit")
          },
        ]} />
      </div>
    </AuthenticatedLayout>
  )
}

export default PartListPage