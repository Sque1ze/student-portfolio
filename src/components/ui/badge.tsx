import * as React from 'react'
import { cn } from '../../lib/utils'

type Variant = 'default' | 'secondary'

export function Badge({
  variant = 'default',
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variant === 'default'
          ? 'bg-[hsl(var(--foreground))] text-[hsl(var(--background))]'
          : 'bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]',
        className
      )}
      {...props}
    />
  )
}
