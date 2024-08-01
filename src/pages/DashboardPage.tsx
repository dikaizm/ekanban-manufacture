import { ReactNode, useEffect, useState } from "react"
import AuthenticatedLayout from "../components/AuthenticatedLayout"
import { RiTableFill } from "react-icons/ri"
import PrimaryButton from "../components/PrimaryButton"
import { Doughnut } from 'react-chartjs-2'
import { Chart as Chartjs, ArcElement, Tooltip, Legend } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useSecureApi } from "../provider/utils/secureApiContext"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { FaBoxOpen } from "react-icons/fa6"

Chartjs.register(ArcElement, Tooltip, Legend, ChartDataLabels)

export default function DashboardPage() {
  return (
    <AuthenticatedLayout className="h-screen">
      <DashboardImpl />
    </AuthenticatedLayout>
  )
}

type ProgressTrackType = {
  assemblyLine: number;
  assemblyStore: number;
  fabrication: number;
}

type DelayOntimeType = { delay: number, ontime: number }

type ProductionProgressType = {
  partNumber: string;
  partName: string;
  station: string;
}

function DashboardImpl() {
  const navigate = useNavigate()
  const { secureApi } = useSecureApi()
  const [progressTrack, setProgressTrack] = useState<ProgressTrackType>({ assemblyLine: 0, assemblyStore: 0, fabrication: 0 })
  const [delayOntime, setDelayOntime] = useState<DelayOntimeType>({ delay: 0, ontime: 0 })
  const [productionProgress, setProductionProgress] = useState<ProductionProgressType[]>([])

  async function fetchProgressTrack() {
    try {
      const response = await secureApi('/stats/progress-track').then(res => res.json())

      if (!response.success) {
        toast.error(response.message)
        return
      }
      setProgressTrack(response.data)

    } catch (error) {
      console.error(error)
      toast.error('Failed to fetch progress track data')
    }
  }

  async function fetchProductionProgress() {
    try {
      const response = await secureApi('/stats/production-progress').then(res => res.json())
      if (!response.success) {
        toast.error('Failed to fetch production progress data')
        return
      }

      setProductionProgress(response.data)

    } catch (error) {
      toast.error('Failed to fetch production progress data')
    }
  }

  async function fetchDelayOntime() {
    try {
      const response = await secureApi('/stats/delay-ontime').then(res => res.json())

      if (!response.success) {
        toast.error(response.message)
        return
      }

      if (response.data) {
        // Calculate percentage
        const delay = Math.floor((response.data.delayQuantity / response.data.totalQuantity) * 100)

        setDelayOntime({ delay, ontime: 100 - delay })
      }

    } catch (error) {
      toast.error('Failed to fetch delay ontime data')
    }
  }

  useEffect(() => {
    fetchProgressTrack()
    fetchDelayOntime()
    fetchProductionProgress()
  }, [])

  return (
    <div className="p-4 sm:p-6 bg-slate-50">
      <section className="flex flex-col justify-between gap-4 sm:flex-row">

        <div className="w-full p-5 bg-white border rounded-lg">
          <CardTitle>Progress Track</CardTitle>
          <div className="flex flex-col gap-8 mt-4">
            <ProgressItem title="Assembly Line" progress={progressTrack.assemblyLine} icon={<RiTableFill className="w-full h-full" />} />
            <ProgressItem title="Assembly Store" progress={progressTrack.assemblyStore} icon={<RiTableFill className="w-full h-full" />} />
            <ProgressItem title="Fabrication" progress={progressTrack.fabrication} icon={<RiTableFill className="w-full h-full" />} />
          </div>
        </div>

        <div className="p-5 bg-white border rounded-lg">
          <CardTitle>Delay vs On-Time</CardTitle>

          <div className="flex justify-center w-full mt-3">
            <div className="w-[13rem] md:w-56 sm:w-64">
              {delayOntime.delay !== 0 && delayOntime.ontime !== 0 ? (
                <Doughnut
                  data={{
                    labels: ['Delay', 'On-Time'],
                    datasets: [
                      {
                        data: [delayOntime.delay, delayOntime.ontime],
                        backgroundColor: [
                          'rgb(255, 178, 44)',
                          'rgb(54, 162, 235)',
                        ],
                        borderWidth: 1,
                      },
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: {
                        position: 'bottom',
                      },
                      tooltip: {
                        enabled: true,
                        callbacks: {
                          label: function (data) {
                            const label = data.label;
                            const value = data.dataset.data[data.dataIndex];
                            return `${label}: ${value}%`;
                          }
                        },
                      },
                      datalabels: {
                        color: '#fff',
                        formatter: function (value) {
                          return `${value}%`;
                        }
                      }
                    },
                  }}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 mt-12 text-center text-gray-400">
                  <FaBoxOpen className="w-12 h-12" />
                  <span>No data</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4">
        <div className="w-full overflow-hidden bg-white border rounded-lg">
          <div className="flex items-center justify-between px-5 pt-4">
            <CardTitle>Production Progress</CardTitle>
            <PrimaryButton onClick={() => {
              navigate('/dashboard/fabrication/shop-floor')
            }}>View All</PrimaryButton>
          </div>

          <div className="relative mt-4 overflow-x-auto max-h-[32rem]">
            {productionProgress.length > 0 ? (
              <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
                <thead className="text-xs text-gray-700 uppercase bg-slate-100">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Part Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Part Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Station
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <TableRow data={productionProgress} />
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center gap-2 pb-6 text-center text-gray-400">
                <FaBoxOpen className="w-12 h-12" />
                <span>Production progress is empty</span>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  )
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg font-semibold">{children}</h2>
  )
}

interface ProgressItemType {
  title: string
  progress: number
  icon: ReactNode
}

function ProgressItem({ title, progress, icon }: ProgressItemType) {
  const [displayedProgress, setDisplayedProgress] = useState(0);

  useEffect(() => {
    setDisplayedProgress(0); // Reset progress to 0 to retrigger animation
    const timer = setTimeout(() => {
      setDisplayedProgress(progress);
    }, 100); // Small delay to ensure the transition effect

    return () => clearTimeout(timer); // Cleanup timer on component unmount or props change
  }, [progress]);

  return (
    <div className="flex items-center justify-between gap-5">
      <div className="w-10 p-2 rounded-full h-fit bg-slate-200">
        {icon}
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold">{title}</h3>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <div className="w-full h-3 mt-1 bg-gray-200 rounded-lg">
          <div className="h-full transition-all duration-700 ease-in-out bg-blue-500 rounded-lg" style={{ width: `${displayedProgress}%` }}></div>
        </div>
      </div>
    </div>
  )
}

function TableRow({ data }: { data: ProductionProgressType[] }) {
  return (
    <>
      {data.map((item, index) => {
        return (
          <tr key={index} className="font-medium text-gray-900 bg-white border-b hover:bg-gray-50 whitespace-nowrap">
            <td className="px-6 py-3">
              {index + 1}
            </td>
            <td className="px-6 py-3">
              {item.partNumber}
            </td>
            <td className="px-6 py-4">
              {item.partName}
            </td>
            <td className="px-6 py-4">
              {item.station}
            </td>
          </tr>
        )
      })}
    </>
  )
}