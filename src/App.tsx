import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'

import AssemblyLineOrderListPage from './pages/AssemblyLine/OrderListPage'
import AssemblyLinePartListPage from './pages/AssemblyLine/PartListPage'
import AssemblyLineKanbanPage from './pages/AssemblyLine/KanbanPage'

import AssemblyStoreOrderListPage from './pages/AssemblyStore/OrderListPage'
import AssemblyStorePartListPage from './pages/AssemblyStore/PartListPage'

import FabricationOrderListPage from './pages/Fabrication/OrderListPage'
import FabricationShopFloorPage from './pages/Fabrication/ShopFloorPage'
import FabricationKanbanPage from './pages/Fabrication/KanbanPage'
import { ModalQRProvider } from './provider/ModalQRProvider'
import ConfirmKanbanPage from './pages/ConfirmKanbanPage'

function App() {
  return (
    <main className='w-full min-h-screen bg-white'>
      <ModalQRProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/dashboard' children={
              <>
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/dashboard/assembly-line' children={
                  <>
                    <Route path='/dashboard/assembly-line/order' element={<AssemblyLineOrderListPage />} />
                    <Route path='/dashboard/assembly-line/part' element={<AssemblyLinePartListPage />} />
                    <Route path='/dashboard/assembly-line/kanban' element={<AssemblyLineKanbanPage />} />
                  </>
                } />
                <Route path='/dashboard/assembly-store' children={
                  <>
                    <Route path='/dashboard/assembly-store/order' element={<AssemblyStoreOrderListPage />} />
                    <Route path='/dashboard/assembly-store/part' element={<AssemblyStorePartListPage />} />
                  </>
                } />
                <Route path='/dashboard/fabrication' children={
                  <>
                    <Route path='/dashboard/fabrication/order' element={<FabricationOrderListPage />} />
                    <Route path='/dashboard/fabrication/shop-floor' element={<FabricationShopFloorPage />} />
                    <Route path='/dashboard/fabrication/kanban' element={<FabricationKanbanPage />} />
                  </>
                } />
              </>
            } />
            <Route path='/confirm-kanban/:cardId' element={<ConfirmKanbanPage />} />
            <Route path='*' element={<div>404 Not Found</div>} />
          </Routes>
        </Router>
      </ModalQRProvider>
    </main>
  )
}

export default App