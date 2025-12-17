import { NavLink } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '../ui/card'
import { cn } from '../../lib/utils'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/todo-list', label: 'Todo List (refactored)' },
  { to: '/lab1', label: 'Lab 1' },
  { to: '/lab2', label: 'Lab 2' },
]

export function Sidebar() {
  return (
    <Card>
      <CardHeader>
        <div className="text-lg font-semibold">Navigation</div>
        <div className="text-sm text-[hsl(var(--muted-foreground))]">
          Routes: /, /todo-list, /lab1, /lab2
        </div>
      </CardHeader>
      <CardContent>
        <nav className="flex flex-col gap-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-sm transition hover:bg-[hsl(var(--muted))]',
                  isActive && 'bg-[hsl(var(--muted))] font-medium'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </CardContent>
    </Card>
  )
}
