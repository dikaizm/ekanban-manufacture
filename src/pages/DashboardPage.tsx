import { ReactNode } from "react"
import AuthenticatedLayout from "../components/AuthenticatedLayout"
import { RiTableFill } from "react-icons/ri"
import PrimaryButton from "../components/PrimaryButton"

export default function DashboardPage() {
  return (
    <AuthenticatedLayout className="h-screen">
      <div className="p-6 bg-slate-50">
        <section className="flex justify-between gap-4">

          <div className="w-full p-5 bg-white border rounded-lg">
            <CardTitle>Progress Track</CardTitle>
            <div className="flex flex-col gap-4 mt-4">
              <ProgressItem title="Task 1" progress={50} icon={<RiTableFill className="w-full h-full" />} />
              <ProgressItem title="Task 2" progress={30} icon={<RiTableFill className="w-full h-full" />} />
              <ProgressItem title="Task 3" progress={70} icon={<RiTableFill className="w-full h-full" />} />
            </div>
          </div>

          <div className="bg-white border p-5 rounded-lg w-[32rem]">
            <CardTitle>Delay vs On-Time</CardTitle>
          </div>
        </section>

        <section className="mt-4">
          <div className="w-full overflow-hidden bg-white border rounded-lg">
            <div className="flex items-center justify-between px-5 pt-4">
              <CardTitle>Production Progress</CardTitle>
              <PrimaryButton>View All</PrimaryButton>
            </div>

            <div className="relative mt-4 overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
                <thead className="text-xs text-gray-700 uppercase bg-slate-100">
                  <tr>
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
                  <TableRow data={productionResults} />
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </AuthenticatedLayout>
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
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="w-10 h-10 p-2 rounded-full bg-slate-200">
        {icon}
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold">{title}</h3>
          <span className="text-sm font-medium">{progress}</span>
        </div>
        <div className="w-full h-3 mt-1 bg-gray-200 rounded-lg">
          <div className="h-full bg-blue-500 rounded-lg" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  )
}

function TableRow({ data }: { data: ProductionResultType[] }) {
  return (
    <>
      {data.map((item, index) => {
        return (
          <tr key={index} className="bg-white border-b hover:bg-gray-50 ">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
              {item.part_no}
            </th>
            <td className="px-6 py-4">
              {item.part_name}
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

type ProductionResultType = {
  part_no: string;
  part_name: string;
  station: string;
}

const productionResults: ProductionResultType[] = [
  {
    part_no: "1283ajkdbiu",
    part_name: "Lorem Ipsum",
    station: "Assembly",
  },
  {
    part_no: "1283ajkdbiu",
    part_name: "Lorem Ipsum",
    station: "Assembly",
  },
  {
    part_no: "1283ajkdbiu",
    part_name: "Lorem Ipsum",
    station: "Assembly",
  },
  {
    part_no: "1283ajkdbiu",
    part_name: "Lorem Ipsum",
    station: "Assembly",
  },
  {
    part_no: "1283ajkdbiu",
    part_name: "Lorem Ipsum",
    station: "Assembly",
  },
  {
    part_no: "1283ajkdbiu",
    part_name: "Lorem Ipsum",
    station: "Assembly",
  },
]