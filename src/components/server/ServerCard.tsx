import { cn } from '@/lib/utils.ts'
import { ArrowDownUpIcon, CheckCircle2Icon } from 'lucide-react'
import { Separator } from '@/components/ui/separator.tsx'
import { cva, VariantProps } from 'class-variance-authority'
import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { Server } from '@/types/dto'

type Props = {
  server: Server
}

export function ServerCard({ server }: Props) {
  return (
    <li className="rounded-md bg-white p-4 text-black shadow">
      {/* Status */}
      <div className="flex items-center text-xs font-light">
        <div className="flex items-center gap-2 text-green-500">
          <CheckCircle2Icon strokeWidth={3} className="size-3.5" />
          <div className="font-medium">100% Availability</div>
        </div>
        <div className="grow"></div>
        <div className="text-slate-400">1 minute ago</div>
      </div>

      {/* Title */}
      <h3 className="mt-2 truncate text-lg text-slate-700">{server.name}</h3>

      {/* Network */}
      <div className="mt-1 flex items-center text-sm font-light text-neutral-400">
        <div className="select-all">8.8.8.8</div>
        <div className="ml-3">128.99 KB/s</div>
        <ArrowDownUpIcon className="ml-0.5 size-4" />
      </div>

      <Separator className="my-6 bg-slate-100" />

      {/* Stats */}
      <ul className="space-y-2">
        <li className="flex items-center">
          <div className="w-12 text-xs text-slate-400">Load</div>
          <Progress
            value={8}
            variant={calcServerProgressVariant(8)}
            className="rounded"
          />
        </li>
        <li className="flex items-center">
          <div className="w-12 text-xs text-slate-400">RAM</div>
          <Progress
            value={20}
            variant={calcServerProgressVariant(20)}
            className="rounded"
          />
        </li>
        <li className="flex items-center">
          <div className="w-12 text-xs text-slate-400">Disk</div>
          <Progress
            value={40}
            variant={calcServerProgressVariant(40)}
            className="rounded"
          />
        </li>
      </ul>
    </li>
  )
}

function calcServerProgressVariant(
  value: number,
): VariantProps<typeof progressIndicatorVariants>['variant'] {
  if (value < 25) return 'idle'
  if (value < 50) return 'low'
  if (value < 70) return 'moderate'
  if (value < 85) return 'warning'
  return 'high'
}

const progressIndicatorVariants = cva(
  'h-full w-full flex-1 bg-primary transition-all',
  {
    variants: {
      variant: {
        idle: 'bg-emerald-500',
        low: 'bg-brand-500',
        moderate: 'bg-amber-400',
        warning: 'bg-orange-500',
        high: 'bg-red-600',
      },
    },
  },
)

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressIndicatorVariants> {}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        'h-full w-full flex-1 bg-primary transition-all',
        progressIndicatorVariants({ variant }),
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
