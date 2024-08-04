import { useEffect, useState } from "react"
import AuthenticatedLayout from "../../components/AuthenticatedLayout"
import Breadcrumb from "../../components/Breadcrumb"
import PrimaryButton from "../../components/PrimaryButton"
import Table from "../../components/Table"
import MainTitle from "../../components/Title/MainTitle"
import { PARTS } from "../../types/const"
import { IoIosArrowDroprightCircle } from "react-icons/io"
import { PartType } from "../../types/global"
import CircleLoading from "../../components/Loading"
import { useSecureApi } from "../../provider/utils/secureApiContext"
import toast from "react-hot-toast"
import { useModal } from "../../provider/utils/modalContext"

const partHead = {
  partNumber: "Part Number",
  partName: "Part Name",
  quantity: "Quantity",
  quantityReq: "Quantity Requirement"
}

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
    <AuthenticatedLayout>
      <PartListImpl />
    </AuthenticatedLayout>
  )
}

function PartListImpl() {
  const { secureApi } = useSecureApi()
  const { openModal, isModalVisible } = useModal()

  const [parts, setParts] = useState<PartType[]>(PARTS)
  const [partStatus, setPartStatus] = useState<string>("No Status")
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const fetchParts = async () => {
    try {
      const response = await secureApi('/assembly-line/parts').then(res => res.json())

      setParts(response.data.parts)
      setPartStatus(response.data.partStatus)
      setIsComplete(response.data.partStatus !== "Complete")

    } catch (error) {
      toast.error("Failed to fetch parts")
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchParts()
  }, [isModalVisible.editPartQty])

  async function handleStartAssemble() {
    try {
      const response = await secureApi('/assembly-line/parts/start', {
        method: 'POST',
        options: {
          body: JSON.stringify({
            componentId: 1,
            requestHost: document.location.host
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }).then(res => res.json())
      if (!response.success) {
        toast.error(response.message)
        return
      }

      toast.success(response.message)
      fetchParts()

    } catch (error) {
      toast.error('Failed to start assemble')
    }
  }

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <MainTitle>Part List</MainTitle>
          <PrimaryButton>Download</PrimaryButton>
        </div>

        {!isLoading ? (
          <>
            <Table head={partHead} body={parts}
              actions={[
                {
                  label: "Edit",
                  color: 'bg-blue-500',
                  onClick: (id: number) => {
                    openModal.editPartQty(id)
                  }
                }
              ]}
            />

            <div className="w-full mt-3 bg-white border rounded-lg">
              <div className="flex items-center justify-between gap-2 p-2">

                <div className="flex items-center gap-2 ml-2 text-sm font-semibold">
                  <span>Status Part</span>
                  <div className={"px-3 py-1 text-white  rounded-full " + (!isComplete ? "bg-green-500" : "bg-yellow-500")}>{partStatus}</div>
                </div>

                <PrimaryButton disabled={isComplete}
                  icon={<IoIosArrowDroprightCircle className="w-6 h-6" />}
                  onClick={handleStartAssemble}
                >Start</PrimaryButton>

              </div>
            </div>
          </>
        ) : (
          <CircleLoading className="h-[calc(100vh-16rem)]" />
        )}

      </div>
    </>
  )
}