import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function AppLayout() {
  return (
    <div className="min-h-dvh">
      <Header />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 p-4 md:grid-cols-[240px_1fr]">
        <Sidebar />
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
