interface TableType {
    head: string[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: { [key: string]: any }[]
}

export default function Table({ head, body }: TableType) {
    if (head.length === 0) { throw new Error("Head must not be empty") }
    if (body.length === 0) { throw new Error("Body must not be empty") }

    const headLen = head.length
    const bodyItemLen = Object.keys(body[0]).length

    if (headLen !== bodyItemLen) {
        throw new Error("Head and body length must be the same")
    }

    return (
        <div className="relative mt-6 overflow-x-auto border rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
                <thead className="text-xs text-gray-700 uppercase bg-slate-100">
                    <tr>
                        <th scope="col" className="px-6 py-3">#</th>
                        {head.map((item, index) => {
                            return (
                                <th key={index} scope="col" className="px-6 py-3">
                                    {item}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    <TableRow data={body} />
                </tbody>
            </table>
        </div>
    )
}


interface TableRowType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { [key: string]: any }[]
}

function TableRow({ data }: TableRowType) {
    if (data.length === 0) {
        return (
            <tr>
                <td colSpan={10} className="text-center">No data found</td>
            </tr>
        )
    }

    const keys = ["#", ...Object.keys(data[0])]

    return (
        <>
            {data.map((item, index) => {
                return (
                    <tr key={index} className="bg-white border-b hover:bg-gray-50" >
                        {keys.map((key) => (
                            <td key={key} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {key === "#" ? index + 1 : item[key]}
                            </td>
                        ))}
                    </tr>
                );
            })}
        </>
    )
}