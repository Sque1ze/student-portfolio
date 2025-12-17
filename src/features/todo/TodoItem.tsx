import * as React from 'react'
import { Trash2, Pencil, Save, X } from 'lucide-react'
import type { TodoItem as Todo } from './todo.types'
import { Button } from '../../components/ui/button'
import { Checkbox } from '../../components/ui/checkbox'
import { Input } from '../../components/ui/input'
import { cn } from '../../lib/utils'

export function TodoItemRow({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: {
  todo: Todo
  onToggle: (id: number, completed: boolean) => void
  onDelete: (id: number) => void
  onEdit: (id: number, text: string) => void
}) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [value, setValue] = React.useState(todo.text)

  React.useEffect(() => {
    setValue(todo.text)
  }, [todo.text])

  return (
    <div className="flex items-center gap-3 rounded-lg border border-[hsl(var(--border))] p-3">
      <Checkbox checked={todo.completed} onCheckedChange={(v) => onToggle(todo.id, v)} />

      <div className="min-w-0 flex-1">
        {isEditing ? (
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        ) : (
          <div className={cn('truncate text-sm', todo.completed && 'line-through opacity-70')}>
            {todo.text}
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              onEdit(todo.id, value)
              setIsEditing(false)
            }}
            title="Save"
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setValue(todo.text)
              setIsEditing(false)
            }}
            title="Cancel"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} title="Edit">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(todo.id)} title="Delete">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
