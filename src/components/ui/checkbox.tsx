import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '../../lib/utils'

export type CheckboxProps = {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
  id?: string
}

export function Checkbox({ checked, onCheckedChange, disabled, className, id }: CheckboxProps) {
  return (
    <button
      id={id}
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        'h-5 w-5 rounded border border-[hsl(var(--border))] inline-flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2 focus:ring-offset-[hsl(var(--background))] disabled:opacity-50',
        checked ? 'bg-[hsl(var(--foreground))] text-[hsl(var(--background))]' : 'bg-transparent text-transparent',
        className
      )}
    >
      <Check className="h-4 w-4" />
    </button>
  )
}
