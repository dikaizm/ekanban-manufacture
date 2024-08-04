import { useEffect, useRef, useState } from "react"
import AuthenticatedLayout from "../../components/AuthenticatedLayout"
import Breadcrumb from "../../components/Breadcrumb"
import PrimaryButton from "../../components/PrimaryButton"
import Table from "../../components/Table"
import MainTitle from "../../components/Title/MainTitle"
import { useSecureApi } from "../../provider/utils/secureApiContext"
import { ACTIONS } from "../../types/const"
import CircleLoading from "../../components/Loading"
import toast from "react-hot-toast"
import { PartStoreType } from "../../types/global"
import DownloadTableExcel from "../../components/DownloadTableExcel"

const breadcrumbItems = [
  {
    label: "Assembly Store",
  },
  {
    label: "Part List"
  }
]

const partHead = {
  partNumber: "Part Number",
  partName: "Part Name",
  stock: "Stock",
  status: "Status"
}

function PartListPage() {
  return (
    <AuthenticatedLayout>
      <PartListImpl />
    </AuthenticatedLayout>
  )
}

function PartListImpl() {
  const tableRef = useRef<HTMLTableElement>(null)
  const { secureApi } = useSecureApi()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [parts, setParts] = useState<PartStoreType[]>([])

  const fetchParts = async () => {
    try {
      const response = await secureApi('/assembly-store/parts').then(res => res.json())

      if (!response.success) {
        toast.error(response.message)
      }

      if (response.data) {
        setParts(response.data)
      }

    } catch (error) {
      toast.error("Failed to fetch parts")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchParts()
  }, [])

  async function handleAction(id: number, status: string) {
    try {
      const response = await secureApi('/assembly-store/parts/status', {
        method: "PUT",
        options: {
          body: JSON.stringify({ id, status }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }).then(res => res.json())

      if (!response.success) {
        toast.error(response.message)
      } else {
        toast.success(response.message)
        fetchParts()
      }
    } catch (error) {
      toast.error("Failed to update part status")
    }
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <MainTitle>Part List</MainTitle>
          <DownloadTableExcel filename="assembly-store-part-list" sheet="part list" currentTableRef={tableRef.current!}>
            <PrimaryButton>Download</PrimaryButton>
          </DownloadTableExcel>
        </div>

        {!isLoading ? (
          <Table tableRef={tableRef} head={partHead} body={parts} actions={[
            {
              label: "Receive",
              color: "bg-blue-500",
              onClick: (partId) => {
                handleAction(partId, "idle")
              },
              type: ACTIONS.PART_STORE.RECEIVE
            },
          ]} />
        ) : (
          <CircleLoading className="h-[calc(100vh-16rem)]" />
        )}
      </div>
    </>
  )
}

export default PartListPage