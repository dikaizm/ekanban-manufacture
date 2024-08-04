import { MouseEvent, ReactNode, useEffect, useState } from 'react'
import { GoHomeFill } from 'react-icons/go'
import { useToggleSidebar } from '../provider/utils/sidebarContext'
import { useNavigate } from 'react-router-dom'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { UserType } from '../types/global'
import PrimaryButton from './PrimaryButton'
import { useModal } from '../provider/utils/modalContext'
import { MdFactory, MdStore } from 'react-icons/md'
import { TbAssemblyFilled } from 'react-icons/tb'

interface SubitemOpenType {
  [key: string]: boolean
  assemblyLine: boolean
  assemblyStore: boolean
  fabrication: boolean
}

export default function Sidebar() {
  const { isSidebarOpen } = useToggleSidebar()
  const { openModal } = useModal()

  const [isSubitemOpen, setIsSubitemOpen] = useState<SubitemOpenType>(JSON.parse(localStorage.getItem('sidebarSubitem')!))
  const [user, setUser] = useState<UserType>({ name: '', email: '', role: '' })

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('user')
    if (!userData) return
    setUser(JSON.parse(userData))
  }, [])

  return (
    <aside className={'fixed z-40 flex flex-col justify-between  min-h-screen p-3 transition-transform duration-200 pt-20 bg-white border-r ' + (isSidebarOpen ? 'w-[14rem]' : 'hidden sm:block w-[4.5rem]')}>
      <section className='flex flex-col gap-1'>
        {(user.role === 'manager') && (<MenuItem link="/dashboard" icon={<GoHomeFill className='w-6 h-6' />}>Dashboard</MenuItem>)}

        {(user.role === 'manager' || user.role === 'assembly_line_operator') && (
          <MenuItem link="/dashboard/assembly-line" icon={<TbAssemblyFilled className='w-6 h-6' />} subitems={
            {
              element: (
                <>
                  {/* <MenuSubItem link="/dashboard/assembly-line/order">Order List</MenuSubItem> */}
                  <div className='p-2 ml-6 text-sm whitespace-nowrap'>
                    <PrimaryButton onClick={(event) => {
                      event.stopPropagation()
                      openModal.createOrder()
                    }}>Create Order</PrimaryButton>
                  </div>
                  <MenuSubItem link="/dashboard/assembly-line/part">Part List</MenuSubItem>
                  <MenuSubItem link="/dashboard/assembly-line/kanban">Kanban Board</MenuSubItem>
                </>
              ),
              state: {
                value: isSubitemOpen.assemblyLine,
                setValue: (value: boolean) => {
                  const subitemState = { ...isSubitemOpen };

                  for (const key in isSubitemOpen) {
                    if (key !== 'assemblyLine') {
                      subitemState[key] = false
                    }
                  }

                  localStorage.setItem('sidebarSubitem', JSON.stringify({ ...subitemState, 'assemblyLine': value }))
                  setIsSubitemOpen({ ...subitemState, 'assemblyLine': value })
                }
              }
            }
          }>Assembly Line</MenuItem>
        )}

        {(user.role === 'manager' || user.role === 'assembly_store_operator') && (
          <MenuItem link="/dashboard/assembly-store" icon={<MdStore className='w-6 h-6' />} subitems={
            {
              element: (
                <>
                  <MenuSubItem link="/dashboard/assembly-store/order">Order List</MenuSubItem>
                  <MenuSubItem link="/dashboard/assembly-store/part">Part List</MenuSubItem>
                </>
              ),
              state: {
                value: isSubitemOpen.assemblyStore,
                setValue: (value: boolean) => {
                  const subitemState = { ...isSubitemOpen };

                  for (const key in isSubitemOpen) {
                    if (key !== 'assemblyStore') {
                      subitemState[key] = false
                    }
                  }

                  localStorage.setItem('sidebarSubitem', JSON.stringify({ ...subitemState, 'assemblyStore': value }))
                  setIsSubitemOpen({ ...subitemState, 'assemblyStore': value })
                }
              }
            }
          }>Assembly Store</MenuItem>
        )}

        {(user.role === 'manager' || user.role === 'fabrication_operator') && (
          <MenuItem link="/dashboard/fabrication" icon={<MdFactory className='w-6 h-6' />} subitems={
            {
              element: (
                <>
                  <MenuSubItem link="/dashboard/fabrication/order">Order List</MenuSubItem>
                  <MenuSubItem link="/dashboard/fabrication/shop-floor">Shop Floor</MenuSubItem>
                  <MenuSubItem link="/dashboard/fabrication/kanban">Kanban Board</MenuSubItem>
                </>
              ),
              state: {
                value: isSubitemOpen.fabrication,
                setValue: (value: boolean) => {
                  const subitemState = { ...isSubitemOpen };

                  for (const key in isSubitemOpen) {
                    if (key !== 'fabrication') {
                      subitemState[key] = false
                    }
                  }

                  localStorage.setItem('sidebarSubitem', JSON.stringify({ ...subitemState, 'fabrication': value }))
                  setIsSubitemOpen({ ...subitemState, 'fabrication': value })
                }
              }
            }
          }>Fabrication</MenuItem>
        )}

      </section>

      {isSidebarOpen && (
        <section>
          <p className="text-xs text-slate-500">Copyright 2024</p>
        </section>
      )}
    </aside>
  )
}

interface MenuItemType {
  children: ReactNode
  icon: ReactNode
  link: string
  subitems?: {
    element: ReactNode
    state: {
      value: boolean
      setValue: (value: boolean) => void
    }
  }
}

function isActive(currentPath: string, path: string) {
  if (currentPath === path) return 'bg-slate-100 hover:bg-slate-200 '
  else return 'hover:bg-slate-100 '
}

function MenuItem({ children, icon, link, subitems }: MenuItemType) {
  const navigate = useNavigate()
  const { isSidebarOpen } = useToggleSidebar()

  const currentPath = window.location.pathname

  function handleNavigate(link: string) {
    navigate(link)
  }

  return (
    <div
      onClick={(event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault()

        if (!subitems) {
          handleNavigate(link)
        }

        subitems?.state.setValue(!subitems.state.value)
      }}
      className={'relative flex flex-col w-full rounded-lg ' + (isActive(currentPath, link)) + (!isSidebarOpen ? 'justify-center ' : 'overflow-hidden ') + (subitems?.state.value ? 'bg-slate-100 ' : '')}
    >
      <div className='flex items-center justify-between w-full px-3 py-2'>
        <div className='flex items-center w-full gap-4'>
          {icon}
          {isSidebarOpen && (<span className='text-sm font-medium'>{children}</span>)}
        </div>
        {(!subitems?.state.value && subitems) ? (
          <TiArrowSortedDown className='w-5 h-5 text-slate-500' />
        ) : (subitems?.state.value && subitems) ? (
          <TiArrowSortedUp className='w-5 h-5 text-slate-500' />
        ) : <></>}
      </div>

      {(subitems && subitems?.state.value && isSidebarOpen) && (
        <div className='flex flex-col w-full'>
          {subitems.element}
        </div>
      )}

      {(subitems && subitems?.state.value && !isSidebarOpen) && (
        <div className='absolute top-0 flex flex-col border rounded-lg bg-white left-[calc(116%)] w-40 overflow-hidden drop-shadow-lg'>
          {subitems.element}
        </div>
      )}
    </div>
  )
}

interface MenuSubItemType {
  children: ReactNode
  link: string
}

function MenuSubItem({ children, link }: MenuSubItemType) {
  const navigate = useNavigate()

  return (
    <button onClick={(event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      event.stopPropagation()

      navigate(link)
    }} className='flex items-center w-full gap-4 py-2 pl-8 hover:bg-slate-200'>
      <span className='text-sm font-medium'>{children}</span>
    </button>
  )
}