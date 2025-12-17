import * as React from 'react'
import { cn } from '../../lib/utils'

export type SwitchProps = {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
  disabled?: boolean
}

export function Switch({ checked, onCheckedChange, className, disabled }: SwitchProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-checked={checked}
      role="switch"
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full border border-[hsl(var(--border))] transition',
        checked ? 'bg-[hsl(var(--foreground))]' : 'bg-[hsl(var(--muted))]',
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      <span
        className={cn(
          'inline-block h-5 w-5 transform rounded-full bg-[hsl(var(--background))] shadow transition',
          checked ? 'translate-x-5' : 'translate-x-1'
        )}
      />
    </button>
  )
}
