import { ACTIONS } from "../types/const"
import CircleLoading from "./Loading"
import { FaBoxOpen } from "react-icons/fa6"

interface ActionType {
  label: string
  color: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (id: any) => void
  type?: string
}

interface TableType {
  head: { [key: string]: string }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: { [key: string]: any }[]
  actions?: ActionType[]
}

export default function Table({ head, body, actions }: TableType) {
  if (!head || !body) return <CircleLoading />

  const headKeys = Object.keys(head)
  if (headKeys.length === 0) { throw new Error("Head must not be empty") }
  if (body.length === 0) {
    // Show empty message
    return (
      <div className="flex flex-col items-center gap-2 mt-8 text-center text-gray-400">
        <FaBoxOpen className="w-12 h-12" />
        <span>List is empty</span>
      </div>
    )
  }

  // const headLen = head.length
  // const bodyItemLen = Object.keys(body[0]).length

  // if (headLen !== bodyItemLen) return <CircleLoading />

  return (
    <div className="relative mt-6 overflow-x-auto border rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
        <thead className="text-xs text-gray-700 uppercase bg-slate-100">
          <tr>
            <th scope="col" className="px-6 py-3">#</th>
            {headKeys.map((key) => (
              <th key={key} scope="col" className="px-6 py-3">
                {head[key]}
              </th>
            ))}
            {actions && (
              <th scope="col" className="px-6 py-3">Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          <TableRow data={body} headKeys={headKeys} actions={actions} />
        </tbody>
      </table>
    </div>
  )
}


interface TableRowType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any }[]
  headKeys: string[]
  actions?: ActionType[]
}

function TableRow({ data, headKeys, actions }: TableRowType) {
  return (
    <>
      {data.map((item, index) => (
        <tr key={index} className="bg-white border-b hover:bg-gray-50">
          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {index + 1}
          </td>
          {headKeys.map((key) => (
            <td key={key} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {item[key]}
            </td>
          ))}
          {actions && (
            <td className="flex gap-2 px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {actions.map((action, actionIndex) => {
                switch (action.type) {
                  case ACTIONS.ORDER_STORE.PRODUCTION:
                    return (
                      <TableActionBtn
                        key={actionIndex}
                        label={action.label}
                        color={action.color}
                        disabled={item.status !== 'pending'}
                        onClick={() => action.onClick && action.onClick(item.id)}
                      />
                    );
                  case (ACTIONS.ORDER_STORE.DELIVER):
                    return (
                      <TableActionBtn
                        key={actionIndex}
                        label={action.label}
                        color={action.color}
                        disabled={!(item.quantity <= item.stock && item.status === 'deliver')}
                        onClick={() => action.onClick && action.onClick(item.id)}
                      />
                    );
                  case (ACTIONS.PART_STORE.RECEIVE):
                    return (
                      <TableActionBtn
                        key={actionIndex}
                        label={action.label}
                        color={action.color}
                        disabled={item.status !== 'finish'}
                        onClick={() => action.onClick && action.onClick(item.id)}
                      />
                    );
                  default:
                    return null;
                }
              })}
            </td>
          )}
        </tr>
      ))}
    </>
  )
}

interface TableActionBtnType {
  label: string
  color: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  disabled?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (id: any) => void
}

export function TableActionBtn({ label, color, disabled = false, onClick }: TableActionBtnType) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg text-white hover:bg-opacity-80  ${disabled ? 'bg-gray-400' : color}`}
      disabled={disabled}
    >
      {label}
    </button>
  )
}