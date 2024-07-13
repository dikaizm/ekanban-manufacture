import { Box, Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material"

import AuthenticatedLayout from "../../components/AuthenticatedLayout"
import MainTitle from "../../components/Title/MainTitle"

interface Order {
  id: number
  partNumber: string
  partName: string
  quantity: number
  plannedStart: string
  status: "queue" | "in_progress" | "done"
  index: number
}

export default function KanbanPage() {


  return (
    <AuthenticatedLayout>
      <div className="p-6">
        {/* Title */}
        <div className="flex items-center justify-between gap-4">
          <MainTitle>Kanban Board</MainTitle>
        </div>

        {/* Content */}
        <OrderColumn status="queue" orders={[
          {
            id: 1,
            partNumber: "12345",
            partName: "Part 1",
            quantity: 10,
            plannedStart: "2021-09-01",
            status: "queue",
            index: 1,
          },
        ]} />

      </div>
    </AuthenticatedLayout>
  )
}

const statusNames: Record<Order["status"], string> = {
  queue: "Queue",
  in_progress: "In Progress",
  done: "Done",
}

function OrderColumn({ status, orders }: { status: Order["status"], orders: Order[] }) {
  return (
    <Box
      sx={{
        flex: 1,
        paddingTop: "8px",
        paddingBottom: "16px",
        bgcolor: "#eaeaee",
        "&:first-child": {
          paddingLeft: "5px",
          borderTopLeftRadius: 5,
        },
        "&:last-child": {
          paddingRight: "5px",
          borderTopRightRadius: 5,
        },
      }}
    >
      <Typography align="center" variant="subtitle1">
        {statusNames[status]}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: 5,
          padding: "5px",
        }}
      >
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </Box>
    </Box>
  )
}

function OrderCard({ order }: { order: Order }) {
  return (
    <Box sx={{ marginBottom: 1 }}>
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1">Part Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{order.partName}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1">Part Number</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{order.partNumber}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1">Quantity</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{order.quantity}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography variant="body1">Planned Start</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{order.plannedStart}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  )
}

const statuses: Order["status"][] = ["queue", "in_progress", "done"]

type OrdersByStatus = Record<Order["status"], Order[]>

function getOrdersByStatus(unorderedOrders: Order[]): OrdersByStatus {
  const ordersByStatus: OrdersByStatus = unorderedOrders.reduce((acc, order) => {
    acc[order.status].push(order)
    return acc
  }, statuses.reduce((obj, status) => ({ ...obj, [status]: [] }), {} as OrdersByStatus))

  statuses.forEach((status) => {
    ordersByStatus[status] = ordersByStatus[status].sort((a, b) => a.index - b.index)
  })

  return ordersByStatus;
} 