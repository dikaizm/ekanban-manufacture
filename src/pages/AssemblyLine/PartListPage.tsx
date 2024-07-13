import AuthenticatedLayout from "../../components/AuthenticatedLayout"
import Breadcrumb from "../../components/Breadcrumb"
import PrimaryButton from "../../components/PrimaryButton"
import Table from "../../components/Table"
import MainTitle from "../../components/Title/MainTitle"
import { PARTS } from "../../types/const"
import { IoIosArrowDroprightCircle } from "react-icons/io"

const partHead = ["Part Number", "Part Name", "Quantity"]

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

          <Table head={partHead} body={PARTS} />

          <div className="w-full mt-3 bg-white border rounded-lg">
            <div className="flex items-center justify-between gap-2 p-2">

              <div className="flex items-center gap-2 ml-2 text-sm font-semibold">
                <span>Status Part</span>
                <div className="px-3 py-1 text-white bg-green-500 rounded-full">Lengkap</div>
              </div>

              <PrimaryButton
                icon={<IoIosArrowDroprightCircle className="w-6 h-6" />}
              >Start</PrimaryButton>

            </div>
          </div>
        </div>
      </AuthenticatedLayout>
    </>
  )
}