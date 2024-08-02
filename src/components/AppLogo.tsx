export default function AppLogo({ iconColor = "bg-green-500" }: { iconColor?: string }) {
  return (
    <div className='flex items-center gap-2'>
      <div className={"w-8 h-8  rounded-full " + iconColor}></div>
      <h1 className='font-bold'>E-Kanban Management</h1>
    </div>
  )
}