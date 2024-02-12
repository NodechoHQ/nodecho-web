import { Input } from '@/components/ui/input.tsx'
import {
  ArrowDownUpIcon,
  CheckCircle2Icon,
  PlusCircleIcon,
  TagIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/lib/utils.ts'
import { cva, VariantProps } from 'class-variance-authority'
import { useState } from 'react'

export default function IndexRoute() {
  return (
    <>
      <div>
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex grow flex-col gap-1">
            <h1 className="text-2xl">Manage Servers</h1>
            <p className="text-sm text-gray-400">
              You have <span className="text-brand">3 of 10</span> servers in
              your account
            </p>
          </div>

          <div className="flex space-x-4">
            <div className="relative flex grow items-center">
              <TagIcon className="absolute right-0 mx-3 size-4 text-muted-foreground" />
              <Input
                name="filter"
                type="search"
                placeholder="Filter"
                className="border-none bg-black/20 pr-10 focus-visible:ring-0"
              />
            </div>

            <Button variant="brand">
              <PlusCircleIcon className="mr-2 size-5" />
              New Server
            </Button>
          </div>
        </div>

        <ul className="3xl:grid-cols-5 mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 10 }, (_, i) => i).map((i) => (
            <ServerCard key={i} idx={i} />
          ))}
        </ul>
      </div>
    </>
  )
}

type ServerCardProps = {
  idx: number
}

function ServerCard({ idx }: ServerCardProps) {
  const [mockLoadValue] = useState((idx + 1) * 10)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setMockLoadValue((prev) => (prev + 3) % 100)
  //   }, 1000)
  //   return () => clearInterval(interval)
  // }, [])

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
      <h3 className="mt-2 truncate text-lg text-slate-700">
        VPS {idx} - Direct to Shanghai then California
      </h3>

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
            value={mockLoadValue}
            variant={calcServerProgressVariant(mockLoadValue)}
            className="rounded"
          />
        </li>
        <li className="flex items-center">
          <div className="w-12 text-xs text-slate-400">RAM</div>
          <Progress
            value={mockLoadValue}
            variant={calcServerProgressVariant(mockLoadValue)}
            className="rounded"
          />
        </li>
        <li className="flex items-center">
          <div className="w-12 text-xs text-slate-400">Disk</div>
          <Progress
            value={mockLoadValue}
            variant={calcServerProgressVariant(mockLoadValue)}
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
