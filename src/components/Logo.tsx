import { NavLink } from 'react-router-dom'
import { BoxIcon } from 'lucide-react'
import { cn } from '@/lib/utils.ts'

type Props = {
  className?: string
  theme?: 'light' | 'dark'
  size?: 'md' | 'lg'
}

export const Logo = ({ className, theme, size }: Props) => (
  <NavLink
    to="/"
    className={cn(
      'flex h-16 shrink-0 items-center justify-center gap-2 transition-opacity hover:opacity-80',
      theme === 'light' ? 'text-white' : 'text-slate-700',
      className,
    )}
  >
    <BoxIcon
      className={cn('size-6 text-brand', size === 'lg' && 'size-10')}
      strokeWidth={3}
    />
    <span className={cn('text-2xl font-bold', size === 'lg' && 'text-3xl')}>
      Nodecho
    </span>
  </NavLink>
)
