import * as React from 'react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Select } from '../../components/ui/select'
import { Separator } from '../../components/ui/separator'
import { TodoItemRow } from './TodoItem'
import { useTodoStore } from './todo.store'

export function TodoView() {
  const {
    isLoading,
    error,
    currentPage,
    limitPerPage,
    totalTodos,
    searchTerm,
    visibleItems,
    canPrev,
    canNext,
    fetchPage,
    setLimit,
    goToNextPage,
    goToPrevPage,
    setSearchTerm,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodoTitle,
  } = useTodoStore()

  const [newTask, setNewTask] = React.useState('')

  React.useEffect(() => {
    // initial load
    void fetchPage()
  }, [fetchPage])

  const items = visibleItems()

  async function handleAdd() {
    await addTodo(newTask)
    setNewTask('')
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task..."
        />
        <Button onClick={handleAdd} disabled={isLoading || !newTask.trim()}>
          Add
        </Button>
      </div>

      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search current page..."
      />

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={goToPrevPage} disabled={!canPrev() || isLoading}>
            Previous
          </Button>
          <Button variant="outline" onClick={goToNextPage} disabled={!canNext() || isLoading}>
            Next
          </Button>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div>
            Page <span className="font-medium">{currentPage}</span> • total items:{' '}
            <span className="font-medium">{totalTodos}</span>
          </div>
          <Select
            value={String(limitPerPage)}
            onChange={(e) => setLimit(Number(e.target.value))}
            aria-label="Items per page"
          >
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </Select>
        </div>
      </div>

      {isLoading && <div className="text-sm text-[hsl(var(--muted-foreground))]">Loading...</div>}
      {error && <div className="text-sm text-red-600">Error: {error}</div>}

      <Separator />

      <div className="space-y-2">
        {!isLoading && items.length === 0 ? (
          <div className="text-sm text-[hsl(var(--muted-foreground))]">No tasks on this page.</div>
        ) : (
          items.map((todo) => (
            <TodoItemRow
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onToggle={toggleTodo}
              onEdit={editTodoTitle}
            />
          ))
        )}
      </div>
    </div>
  )
}
