import AuthenticatedLayout from "../../components/AuthenticatedLayout"
import Breadcrumb from "../../components/Breadcrumb"
import PrimaryButton from "../../components/PrimaryButton"
import Table from "../../components/Table"
import MainTitle from "../../components/Title/MainTitle"

const orderHead = ["Part Number", "Part Name", "Quantity"]

const orderBody = [
  {
    partNumber: "asdhasidha",
    partName: "Part 1",
    quantity: 10,
  },
  {
    partNumber: "jabduyq",
    partName: "Part 2",
    quantity: 20,
  }
]

const breadcrumbItems = [
  {
    label: "Assembly Line",
  },
  {
    label: "Part List"
  }
]

export default function PartListPage() {
  return (
    <>
      <AuthenticatedLayout>
        <Breadcrumb items={breadcrumbItems} />

        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            <MainTitle>Part List</MainTitle>
            <PrimaryButton>Download</PrimaryButton>
          </div>

          <Table head={orderHead} body={orderBody} />
        </div>
      </AuthenticatedLayout>
    </>
  )
}