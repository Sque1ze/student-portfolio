import * as React from 'react'
import { cn } from '../../lib/utils'

type Variant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'

type Size = 'sm' | 'default' | 'lg'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
}

const variantClass: Record<Variant, string> = {
  default:
    'bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:opacity-90',
  secondary:
    'bg-[hsl(var(--muted))] text-[hsl(var(--foreground))] hover:opacity-90',
  outline:
    'border border-[hsl(var(--border))] hover:bg-[hsl(var(--muted))]',
  ghost: 'hover:bg-[hsl(var(--muted))]',
  destructive: 'bg-red-600 text-white hover:opacity-90',
}

const sizeClass: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  default: 'h-9 px-4 text-sm',
  lg: 'h-10 px-5 text-base',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2 focus:ring-offset-[hsl(var(--background))] disabled:opacity-50 disabled:pointer-events-none',
          variantClass[variant],
          sizeClass[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
