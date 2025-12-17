import { Card, CardContent, CardHeader } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'

export function Home() {
  return (
    <Card>
      <CardHeader>
        <div className="text-2xl font-bold">Portfolio</div>
        <div className="text-sm text-[hsl(var(--muted-foreground))]">
          Single Page App using React + TypeScript, React Router, Zustand and shadcn-style UI.
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Badge>React</Badge>
          <Badge variant="secondary">TypeScript</Badge>
          <Badge variant="secondary">React Router</Badge>
          <Badge variant="secondary">Zustand</Badge>
          <Badge variant="secondary">Dark/Light Mode</Badge>
        </div>

        <Separator />

        <div className="space-y-2 text-sm">
          <div className="font-medium">What to demo</div>
          <ul className="list-disc pl-5 text-[hsl(var(--muted-foreground))]">
            <li>Routing to /lab1, /lab2, /todo-list</li>
            <li>Todo List fully refactored to UI components + global store</li>
            <li>Theme switcher in header (light/dark)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
