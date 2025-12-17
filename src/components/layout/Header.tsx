import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Switch } from '../ui/switch'

export function Header() {
  const { theme, setTheme, systemTheme } = useTheme()
  const resolved = theme === 'system' ? systemTheme : theme
  const isDark = resolved === 'dark'

  return (
    <header className="border-b border-[hsl(var(--border))]">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <div className="font-semibold">Student Portfolio</div>
        <div className="flex items-center gap-2 text-sm">
          <Sun className="h-4 w-4" />
          <Switch
            checked={isDark}
            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
          />
          <Moon className="h-4 w-4" />
        </div>
      </div>
    </header>
  )
}
