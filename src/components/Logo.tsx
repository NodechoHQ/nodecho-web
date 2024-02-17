import { NavLink } from 'react-router-dom'
import { BoxIcon } from 'lucide-react'
import { cn } from '@/lib/utils.ts'

type Props = {
  className?: string
}

export const Logo = ({ className }: Props) => (
  <NavLink
    to="/"
    className={cn(
      'flex h-16 shrink-0 items-center justify-center gap-2 text-slate-700 hover:text-slate-600',
      className,
    )}
  >
    <BoxIcon className="size-6 text-brand" strokeWidth={3} />
    <span className="text-2xl font-bold">Nodecho</span>
  </NavLink>
)
