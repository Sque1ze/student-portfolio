import { Card, CardContent, CardHeader } from '../components/ui/card'
import { TodoView } from '../features/todo/TodoView'

export function TodoListPage() {
  return (
    <Card>
      <CardHeader>
        <div className="text-2xl font-bold">Todo List</div>
        <div className="text-sm text-[hsl(var(--muted-foreground))]">
          UI: shadcn-style components • State: Zustand store • Theme: dark/light
        </div>
      </CardHeader>
      <CardContent>
        <TodoView />
      </CardContent>
    </Card>
  )
}
