import { MouseEvent, useEffect, useRef } from 'react'
import { MdMenu } from 'react-icons/md'
import AppLogo from './AppLogo'
import { BsPersonCircle } from 'react-icons/bs'
import { TbLogout2 } from 'react-icons/tb'
import { useState } from 'react'
import { FaPerson } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { useToggleSidebar } from '../provider/utils/sidebarContext'

export default function Topbar() {
  const [isProfilOpen, setIsProfilOpen] = useState<boolean>(false)
  const { isSidebarOpen, toggleSidebar } = useToggleSidebar()

  const profileRef = useRef<HTMLDivElement>(null)

  function handleProfileClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setIsProfilOpen(!isProfilOpen)
  }

  function handleMenuClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    toggleSidebar(!isSidebarOpen)
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClickOutside(event: any) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfilOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfilOpen]);

  return (
    <header className='fixed z-50 flex items-center justify-between w-full h-16 gap-4 pl-4 pr-6 bg-white border-b'>
      <section className='flex items-center gap-4'>
        <button onClick={handleMenuClick} type="button" className='w-10 h-10 p-2 rounded-full hover:bg-slate-200'>
          <MdMenu className='w-full h-full' />
        </button>

        <AppLogo />
      </section>

      <section ref={profileRef} className='relative'>
        <button type="button" onClick={handleProfileClick} className={'flex items-center gap-2 p-2 border rounded-full  hover:bg-slate-200 ' + (isProfilOpen ? 'bg-slate-200' : 'border-slate-300')}>
          <span className='text-sm font-semibold'>John Doe</span>
          <BsPersonCircle className='w-6 h-6' />
        </button>

        <ProfileDropdown isOpen={isProfilOpen} />
      </section>
    </header>
  )
}

function ProfileDropdown({ isOpen }: { isOpen: boolean }) {
  const navigate = useNavigate()

  function handleLogout(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    localStorage.removeItem('sidebar')
    navigate('/login')
  }

  return (
    <div className={'absolute right-0 p-1 bg-white rounded-lg w-60 top-12 shadow-lg border border-slate-100 ' + (isOpen ? 'block' : 'hidden')}>
      <div className='flex items-center gap-3 p-2'>
        <BsPersonCircle className='w-8 h-8' />
        <div>
          <p className='text-sm font-semibold'>John Doe</p>
          <p className='text-xs text-slate-400'>test@mail.com</p>
        </div>
      </div>

      <div className='flex flex-col gap-3'>
        <div className='flex items-center gap-3 p-2 rounded-full bg-slate-100'>
          <div className='p-1 bg-white rounded-full w-7 h-7'>
            <FaPerson className='w-full h-full text-slate-500' />
          </div>
          <p className='text-xs font-medium'>Administrator</p>
        </div>

        <hr className='border-slate-200' />

        <button onClick={handleLogout} type="button" className='flex items-center w-full gap-4 px-1 py-2 rounded-lg hover:bg-slate-100'>
          <TbLogout2 className='w-6 h-6' />
          <span className='text-sm font-medium'>Keluar</span>
        </button>
      </div>
    </div>
  )
}