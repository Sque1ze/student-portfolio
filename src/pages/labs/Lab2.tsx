import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Separator } from '../../components/ui/separator'

type Book = {
  id: number
  firstName: string
  lastName: string
  phone: string
}

type FormState = {
  firstName: string
  lastName: string
  phone: string
}

function AddForm({ onAdd }: { onAdd: (form: FormState) => void }) {
  const [form, setForm] = useState<FormState>({ firstName: '', lastName: '', phone: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const validate = () => {
    const errs: Partial<Record<keyof FormState, string>> = {}
    if (!form.firstName.trim()) errs.firstName = 'The first name is required'
    if (!form.lastName.trim()) errs.lastName = 'The last name is required'
    if (!form.phone.trim()) errs.phone = 'The phone is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    onAdd(form)
    setForm({ firstName: '', lastName: '', phone: '' })
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-3">
      <div className="space-y-1">
        <Input
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
        />
        {errors.firstName && <div className="text-sm text-red-500">{errors.firstName}</div>}
      </div>

      <div className="space-y-1">
        <Input
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => setForm((p) => ({ ...p, lastName: e.target.value }))}
        />
        {errors.lastName && <div className="text-sm text-red-500">{errors.lastName}</div>}
      </div>

      <div className="space-y-1">
        <Input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
        />
        {errors.phone && <div className="text-sm text-red-500">{errors.phone}</div>}
      </div>

      <div className="sm:col-span-3">
        <Button type="submit">Add</Button>
      </div>
    </form>
  )
}

function AddressTable({
  data,
  onUpdate,
}: {
  data: Book[]
  onUpdate: (updated: Book) => void
}) {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Book | null>(null)

  const handleEdit = (book: Book) => {
    setEditingId(book.id)
    setEditForm({ ...book })
  }

  const handleSave = () => {
    if (!editForm) return
    if (!editForm.firstName.trim() || !editForm.lastName.trim() || !editForm.phone.trim()) {
      alert('Fields cannot be empty')
      return
    }
    onUpdate(editForm)
    setEditingId(null)
    setEditForm(null)
  }

  if (data.length === 0) {
    return <div className="text-sm text-[hsl(var(--muted-foreground))]">No data to display.</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b">
          <tr>
            <th className="py-2 pr-3">Id</th>
            <th className="py-2 pr-3">First Name</th>
            <th className="py-2 pr-3">Last Name</th>
            <th className="py-2 pr-3">Phone</th>
            <th className="py-2 pr-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((b) =>
            editingId === b.id && editForm ? (
              <tr key={b.id} className="border-b">
                <td className="py-2 pr-3">{b.id}</td>
                <td className="py-2 pr-3">
                  <Input
                    value={editForm.firstName}
                    onChange={(e) => setEditForm((p) => (p ? { ...p, firstName: e.target.value } : p))}
                  />
                </td>
                <td className="py-2 pr-3">
                  <Input
                    value={editForm.lastName}
                    onChange={(e) => setEditForm((p) => (p ? { ...p, lastName: e.target.value } : p))}
                  />
                </td>
                <td className="py-2 pr-3">
                  <Input
                    value={editForm.phone}
                    onChange={(e) => setEditForm((p) => (p ? { ...p, phone: e.target.value } : p))}
                  />
                </td>
                <td className="py-2 pr-3">
                  <Button onClick={handleSave}>Save</Button>
                </td>
              </tr>
            ) : (
              <tr key={b.id} className="border-b">
                <td className="py-2 pr-3">{b.id}</td>
                <td className="py-2 pr-3">{b.firstName}</td>
                <td className="py-2 pr-3">{b.lastName}</td>
                <td className="py-2 pr-3">{b.phone}</td>
                <td className="py-2 pr-3">
                  <Button variant="outline" onClick={() => handleEdit(b)}>
                    Edit
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export function Lab2() {
  const [books, setBooks] = useState<Book[]>([])
  const [search, setSearch] = useState('')

  const handleAdd = (form: FormState) => {
    const newBook: Book = { id: Date.now(), ...form }
    setBooks((prev) => [...prev, newBook])
  }

  const handleUpdate = (updatedBook: Book) => {
    setBooks((prev) => prev.map((b) => (b.id === updatedBook.id ? updatedBook : b)))
  }

  const filtered = useMemo(() => {
    const s = search.toLowerCase().trim()
    if (!s) return books
    return books.filter((b) => `${b.firstName} ${b.lastName}`.toLowerCase().includes(s))
  }, [books, search])

  return (
    <Card>
      <CardHeader>
        <div className="text-2xl font-bold">Lab 2 — (Address Book)</div>
        <div className="text-sm text-[hsl(var(--muted-foreground))]">
          Adding, searching, and editing records.
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2">
          <div className="font-semibold">Search</div>
          <Input placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="font-semibold">Add new</div>
          <AddForm onAdd={handleAdd} />
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="font-semibold">Address Book</div>
          <AddressTable data={filtered} onUpdate={handleUpdate} />
        </div>
      </CardContent>
    </Card>
  )
}