import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { Home } from '../pages/Home'
import { TodoListPage } from '../pages/TodoListPage'
import { Lab1 } from '../pages/labs/Lab1'
import { Lab2 } from '../pages/labs/Lab2'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/todo-list" element={<TodoListPage />} />
        <Route path="/lab1" element={<Lab1 />} />
        <Route path="/lab2" element={<Lab2 />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
