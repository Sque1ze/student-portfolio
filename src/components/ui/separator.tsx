import * as React from 'react'
import { cn } from '../../lib/utils'

export function Separator({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return (
    <hr
      className={cn('my-4 border-t border-[hsl(var(--border))]', className)}
      {...props}
    />
  )
}
