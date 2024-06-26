import {
  ArrowUpDownIcon,
  DotIcon,
  EditIcon,
  MoveDownIcon,
  MoveRightIcon,
  MoveUpIcon,
  TrendingDownIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button.tsx'
import { Card } from '@/components/ui/card.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import * as apiService from '@/services/api-service'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton'

const data = {
  name: 'Server Name',
  uptime: '4 hours',
  availability: 98.73,
  nextUpdate: 166,
  stats: [
    { name: 'System Uptime', value: '9 days' },
    { name: 'Operating System', value: 'CentOS Linux 7 (Core) x64' },
    { name: 'Kernel', value: '3.10.0-1160.15.2.el7.x86_64' },
    { name: 'File Handles', value: '1,000 of 47,654' },
    { name: 'Processes', value: '91' },
    { name: 'Sessions', value: '1' },
    { name: 'CPU Model', value: 'QEMU Virtual CPU Version (cpu64-rhel6)' },
    { name: 'CPU Speed', value: '1x 2267 MHz' },
    { name: 'Network Activity', value: '128.99 KB/s', icon: ArrowUpDownIcon },
    { name: 'Total Outgoing', value: '681.75 MB', icon: MoveUpIcon },
    { name: 'Total Incoming', value: '1.2 GB', icon: MoveDownIcon },
    { name: 'Connections', value: '1,000' },
  ],
}

// x-axis is time, from 02:48 to 03:45, 3 minutes interval
// y-axis is network usage in MB, from 0 to 100 MB, random data
// line 1 is RX (incoming)
// line 2 is TX (outgoing)
const networkUsageData = [
  { name: '02:48', rx: 0, tx: 0 },
  { name: '02:51', rx: 20, tx: 10 },
  { name: '02:54', rx: 40, tx: 20 },
  { name: '02:57', rx: 60, tx: 30 },
  { name: '03:00', rx: 80, tx: 40 },
  { name: '03:03', rx: 100, tx: 50 },
  { name: '03:06', rx: 80, tx: 40 },
  { name: '03:09', rx: 60, tx: 30 },
  { name: '03:12', rx: 40, tx: 20 },
  { name: '03:15', rx: 20, tx: 10 },
  { name: '03:18', rx: 0, tx: 0 },
  { name: '03:21', rx: 20, tx: 10 },
  { name: '03:24', rx: 40, tx: 20 },
  { name: '03:27', rx: 60, tx: 30 },
  { name: '03:30', rx: 80, tx: 40 },
  { name: '03:33', rx: 100, tx: 50 },
  { name: '03:36', rx: 80, tx: 40 },
  { name: '03:39', rx: 60, tx: 30 },
  { name: '03:42', rx: 40, tx: 20 },
  { name: '03:45', rx: 20, tx: 10 },
]

const latencyData = [
  { name: '02:48', europe: 100, usa: 150, asia: 200 },
  { name: '02:51', europe: 110, usa: 160, asia: 210 },
  { name: '02:54', europe: 120, usa: 170, asia: 220 },
  { name: '02:57', europe: 130, usa: 180, asia: 230 },
  { name: '03:00', europe: 140, usa: 190, asia: 240 },
  { name: '03:03', europe: 150, usa: 200, asia: 250 },
  { name: '03:06', europe: 140, usa: 190, asia: 240 },
  { name: '03:09', europe: 130, usa: 180, asia: 230 },
  { name: '03:12', europe: 120, usa: 170, asia: 220 },
  { name: '03:15', europe: 110, usa: 160, asia: 210 },
  { name: '03:18', europe: 100, usa: 150, asia: 200 },
  { name: '03:21', europe: 110, usa: 160, asia: 210 },
  { name: '03:24', europe: 120, usa: 170, asia: 220 },
  { name: '03:27', europe: 130, usa: 180, asia: 230 },
  { name: '03:30', europe: 140, usa: 190, asia: 240 },
  { name: '03:33', europe: 150, usa: 200, asia: 250 },
  { name: '03:36', europe: 140, usa: 190, asia: 240 },
  { name: '03:39', europe: 130, usa: 180, asia: 230 },
  { name: '03:42', europe: 120, usa: 170, asia: 220 },
  { name: '03:45', europe: 110, usa: 160, asia: 210 },
]

const averageLoadData = [
  { name: '02:48', system: 6, cpu: 3, disk_io: 2 },
  { name: '02:51', system: 7, cpu: 4, disk_io: 3 },
  { name: '02:54', system: 8, cpu: 5, disk_io: 4 },
  { name: '02:57', system: 9, cpu: 6, disk_io: 5 },
  { name: '03:00', system: 10, cpu: 7, disk_io: 6 },
  { name: '03:03', system: 11, cpu: 8, disk_io: 7 },
  { name: '03:06', system: 10, cpu: 7, disk_io: 6 },
  { name: '03:09', system: 9, cpu: 6, disk_io: 5 },
  { name: '03:12', system: 8, cpu: 5, disk_io: 4 },
  { name: '03:15', system: 7, cpu: 4, disk_io: 3 },
  { name: '03:18', system: 6, cpu: 3, disk_io: 2 },
  { name: '03:21', system: 7, cpu: 4, disk_io: 3 },
  { name: '03:24', system: 8, cpu: 5, disk_io: 4 },
  { name: '03:27', system: 9, cpu: 6, disk_io: 5 },
  { name: '03:30', system: 10, cpu: 7, disk_io: 6 },
  { name: '03:33', system: 11, cpu: 8, disk_io: 7 },
  { name: '03:36', system: 10, cpu: 7, disk_io: 6 },
  { name: '03:39', system: 9, cpu: 6, disk_io: 5 },
  { name: '03:42', system: 8, cpu: 5, disk_io: 4 },
  { name: '03:45', system: 7, cpu: 4, disk_io: 3 },
]

const memoryUsageData = [
  { name: '02:48', ram: 1024, swap: 256 },
  { name: '02:51', ram: 1024, swap: 256 },
  { name: '02:54', ram: 1024, swap: 256 },
  { name: '02:57', ram: 1024, swap: 256 },
  { name: '03:00', ram: 1024, swap: 256 },
  { name: '03:03', ram: 1024, swap: 256 },
  { name: '03:06', ram: 1024, swap: 256 },
  { name: '03:09', ram: 1024, swap: 256 },
  { name: '03:12', ram: 1024, swap: 256 },
  { name: '03:15', ram: 1024, swap: 256 },
  { name: '03:18', ram: 1024, swap: 256 },
  { name: '03:21', ram: 1024, swap: 256 },
  { name: '03:24', ram: 1024, swap: 256 },
  { name: '03:27', ram: 1024, swap: 256 },
  { name: '03:30', ram: 1024, swap: 256 },
  { name: '03:33', ram: 1024, swap: 256 },
  { name: '03:36', ram: 1024, swap: 256 },
  { name: '03:39', ram: 1024, swap: 256 },
  { name: '03:42', ram: 1024, swap: 256 },
  { name: '03:45', ram: 1024, swap: 256 },
]

const diskUsageData = [
  { name: '02:48', disk: 10 },
  { name: '02:51', disk: 20 },
  { name: '02:54', disk: 30 },
  { name: '02:57', disk: 40 },
  { name: '03:00', disk: 50 },
  { name: '03:03', disk: 60 },
  { name: '03:06', disk: 50 },
  { name: '03:09', disk: 40 },
  { name: '03:12', disk: 30 },
  { name: '03:15', disk: 20 },
  { name: '03:18', disk: 10 },
  { name: '03:21', disk: 20 },
  { name: '03:24', disk: 30 },
  { name: '03:27', disk: 40 },
  { name: '03:30', disk: 50 },
  { name: '03:33', disk: 60 },
  { name: '03:36', disk: 50 },
  { name: '03:39', disk: 40 },
  { name: '03:42', disk: 30 },
  { name: '03:45', disk: 20 },
]

const diskPartitionData = [
  { label: '/dev/root', usage: 14.27, total: 19.38 },
  { label: '/dev/sda1', usage: 14.27, total: 19.38 },
  { label: '/dev/sda2', usage: 14.27, total: 19.38 },
  { label: '/dev/sda3', usage: 14.27, total: 19.38 },
  { label: '/dev/sda4', usage: 14.27, total: 19.38 },
  { label: '/dev/sda5', usage: 14.27, total: 19.38 },
  { label: '/dev/sda6', usage: 14.27, total: 19.38 },
]

const timeframeOptions = [
  {
    label: 'Monthly',
    value: 'monthly',
  },
  {
    label: 'Daily',
    value: 'daily',
  },
  {
    label: 'Hourly',
    value: 'hourly',
  },
] as const

type Timeframe = (typeof timeframeOptions)[number]['value']

export default function ServerDetailRoute() {
  const { sid } = useParams()

  if (sid === undefined) {
    throw new Error('Server ID is required')
  }

  const [networkUsageTimeframe, setNetworkUsageTimeframe] =
    useState<Timeframe>('hourly')
  const [latencyTimeframe, setLatencyTimeframe] = useState<Timeframe>('hourly')
  const [averageLoadTimeframe, setAverageLoadTimeframe] =
    useState<Timeframe>('hourly')
  const [memoryUsageTimeframe, setMemoryUsageTimeframe] =
    useState<Timeframe>('hourly')
  const [diskUsageTimeframe, setDiskUsageTimeframe] =
    useState<Timeframe>('hourly')

  const handleNetworkUsageTimeframeChange = (value: string) => {
    if (value === 'monthly' || value === 'daily' || value === 'hourly') {
      setNetworkUsageTimeframe(value)
    } else {
      setNetworkUsageTimeframe('hourly')
    }
  }

  const handleLatencyTimeframeChange = (value: string) => {
    if (value === 'monthly' || value === 'daily' || value === 'hourly') {
      setLatencyTimeframe(value)
    } else {
      setLatencyTimeframe('hourly')
    }
  }

  const handleAverageLoadTimeframeChange = (value: string) => {
    if (value === 'monthly' || value === 'daily' || value === 'hourly') {
      setAverageLoadTimeframe(value)
    } else {
      setAverageLoadTimeframe('hourly')
    }
  }

  const handleMemoryUsageTimeframeChange = (value: string) => {
    if (value === 'monthly' || value === 'daily' || value === 'hourly') {
      setMemoryUsageTimeframe(value)
    } else {
      setMemoryUsageTimeframe('hourly')
    }
  }

  const handleDiskUsageTimeframeChange = (value: string) => {
    if (value === 'monthly' || value === 'daily' || value === 'hourly') {
      setDiskUsageTimeframe(value)
    } else {
      setDiskUsageTimeframe('hourly')
    }
  }

  return (
    <div className="flex flex-col gap-y-8">
      <Header serverId={+sid} />

      <StatisticsTable />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <AverageSystemLoad />
        <CurrentRamUsage />
        <OverallDiskUsage />
      </div>

      <NetworkUsageSection
        timeframe={networkUsageTimeframe}
        onTimeframeChange={handleNetworkUsageTimeframeChange}
      />

      <LatencySection
        timeframe={latencyTimeframe}
        onTimeframeChange={handleLatencyTimeframeChange}
      />

      <AverageLoadSection
        timeframe={averageLoadTimeframe}
        onTimeframeChange={handleAverageLoadTimeframeChange}
      />

      <MemoryUsageSection
        timeframe={memoryUsageTimeframe}
        onTimeframeChange={handleMemoryUsageTimeframeChange}
      />

      <DiskUsageSection
        timeframe={diskUsageTimeframe}
        onTimeframeChange={handleDiskUsageTimeframeChange}
      />
    </div>
  )
}

function Header({ serverId }: { serverId: number }) {
  const serverQuery = useQuery({
    queryKey: ['servers', serverId],
    queryFn: () => apiService.fetchServer(serverId),
  })

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div>
        {serverQuery.data ? (
          <h2 className="text-2xl">{serverQuery.data.name}</h2>
        ) : (
          <Skeleton className="h-8 w-[250px] opacity-10" />
        )}
        <div className="flex">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center text-sm text-lime-500">
              <div className="mr-2 size-4 rounded-full border-4 border-lime-500"></div>
              <div className="gap-1 sm:flex sm:items-center">
                <div>Network data uptime {data.uptime}</div>
                <DotIcon className="hidden size-4 sm:inline" />
                <div>{data.availability}% Availability</div>
              </div>
            </div>
            <div className="text-base text-gray-400">
              Next update in{' '}
              <span className="rounded-sm bg-brand-background-700 p-1 font-mono text-sm text-gray-300">
                {data.nextUpdate}
              </span>{' '}
              seconds
            </div>
          </div>
        </div>
      </div>

      <Button variant="brand" asChild>
        <Link to={`/servers/${serverId}/edit`}>
          <EditIcon strokeWidth={3} className="mr-2 size-4" />
          Edit Server
        </Link>
      </Button>
    </div>
  )
}

function StatisticsTable() {
  return (
    <div className="grid grid-flow-col grid-cols-1 grid-rows-12 gap-2 text-sm md:grid-cols-2 md:grid-rows-6">
      {data.stats.map((stat) => (
        <div key={stat.name} className="grid grid-cols-5">
          <div className="col-span-2 flex items-center gap-0.5 text-slate-400">
            {stat.name}
            {stat.icon && <stat.icon className="size-4" />}
          </div>
          <div className="col-span-3 truncate">{stat.value}</div>
        </div>
      ))}
    </div>
  )
}

function AverageSystemLoad() {
  return (
    <Card className="space-y-3 p-6">
      <h3 className="text-sm font-medium text-slate-400">
        Average system load
      </h3>
      <div className="flex items-baseline gap-2">
        <div className="text-3xl text-slate-700">3%</div>
        <div className="text-slate-500">0.03 0.03 0.00</div>
      </div>
      <div className="relative overflow-clip rounded">
        <div className="h-4 w-full bg-muted"></div>
        <div className="absolute bottom-0 left-0 top-0 z-10 h-full w-6 bg-brand"></div>
      </div>
      <div className="flex items-center text-sm text-slate-600">
        <TrendingDownIcon className="mr-2 size-4" />
        3% lower
        <div className="ml-1 text-slate-400">than one hour ago</div>
      </div>
    </Card>
  )
}

function CurrentRamUsage() {
  return (
    <Card className="space-y-3 p-6">
      <h3 className="relative flex items-center text-sm font-medium text-slate-400">
        <div>Current RAM usage</div>
        <span className="absolute right-0 rounded-sm bg-slate-200 px-1 py-0.5 text-xs text-slate-400">
          SWAP
        </span>
      </h3>
      <div className="flex items-baseline gap-2">
        <div className="text-3xl text-slate-700">131.9 MB</div>
        <div className="text-slate-500">of 482 MB</div>
      </div>
      <div className="relative overflow-clip rounded">
        <div className="h-4 w-full bg-muted"></div>
        <div className="absolute bottom-0 left-0 top-0 z-10 h-full w-20 bg-brand"></div>
      </div>
      <div className="flex items-center text-sm text-slate-600">
        <MoveRightIcon className="mr-2 size-4" />
        No change
        <div className="ml-1 text-slate-400">in the last hour</div>
      </div>
    </Card>
  )
}

function OverallDiskUsage() {
  return (
    <Card className="space-y-3 p-6">
      <h3 className="text-sm font-medium text-slate-400">Overall disk usage</h3>
      <div className="flex items-baseline gap-2">
        <div className="text-3xl text-slate-700">1.6 GB</div>
        <div className="text-slate-500">of 19 GB</div>
      </div>
      <div className="relative overflow-clip rounded">
        <div className="h-4 w-full bg-muted"></div>
        <div className="absolute bottom-0 left-0 top-0 z-10 h-full w-10 bg-brand"></div>
      </div>
      <div className="flex items-center text-sm text-slate-600">
        <MoveRightIcon className="mr-2 size-4" />
        No change
        <div className="ml-1 text-slate-400">in the last hour</div>
      </div>
    </Card>
  )
}

function NetworkUsageSection({
  timeframe,
  onTimeframeChange,
}: {
  timeframe: Timeframe
  onTimeframeChange: (value: string) => void
}) {
  return (
    <Card className="p-6">
      <div className="flex flex-wrap gap-2">
        <div className="flex grow items-baseline gap-2 text-slate-600">
          <h3 className="text-2xl font-medium">Network Usage</h3>
          <div>on eth0</div>
        </div>
        <Tabs value={timeframe} onValueChange={onTimeframeChange}>
          <TabsList>
            {timeframeOptions.map((option) => (
              <TabsTrigger key={option.value} value={option.value}>
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <Separator className="my-4" />
      <div className="my-8 h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={networkUsageData}
            margin={{
              top: 5,
              right: 30,
              bottom: 5,
              left: -15,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="rx"
              stroke="#00AEE7"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="tx"
              stroke="#5CCE43"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Card className="overflow-x-auto">
        <Table className="table-auto">
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-baseline gap-1.5 text-nowrap">
                  Network Information
                  <div className="text-sm font-light">
                    by <a className="text-brand">Maxmind</a>
                  </div>
                </div>
              </TableHead>
              <TableHead>IPv4</TableHead>
              <TableHead>IPv6</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Total
                  <ArrowUpDownIcon className="ml-1 size-4" />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="*:text-nowrap">
              <TableCell>Canada AS12345 OVH Systems</TableCell>
              <TableCell>192.168.0.1</TableCell>
              <TableCell>2024:0217:19:3223::1</TableCell>
              <TableCell>2745.47 MB</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Card>
  )
}

function LatencySection({
  timeframe,
  onTimeframeChange,
}: {
  timeframe: Timeframe
  onTimeframeChange: (value: string) => void
}) {
  return (
    <Card className="p-6">
      <div className="flex flex-wrap gap-2">
        <div className="flex grow items-baseline gap-2 text-slate-600">
          <h3 className="text-2xl font-medium">Latency</h3>
          <div>to Europe, USA & Asia</div>
        </div>
        <Tabs value={timeframe} onValueChange={onTimeframeChange}>
          <TabsList>
            {timeframeOptions.map((option) => (
              <TabsTrigger key={option.value} value={option.value}>
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <Separator className="my-4" />
      <div className="my-8 h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={latencyData}
            margin={{
              top: 5,
              right: 30,
              bottom: 5,
              left: -15,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="asia"
              stroke="#FFB946"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="usa"
              stroke="#00AEE7"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="europe"
              stroke="#5CCE43"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Card className="overflow-x-auto">
        <Table className="table-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Europe</TableHead>
              <TableHead>USA</TableHead>
              <TableHead>Asia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="*:text-nowrap">
              <TableCell>
                Milan, Italy
                <span className="ml-2 text-sm font-light text-green-500">
                  Online
                </span>
              </TableCell>
              <TableCell>
                Dallas, Texas
                <span className="ml-2 text-sm font-light text-green-500">
                  Online
                </span>
              </TableCell>
              <TableCell>
                Pune, India
                <span className="ml-2 text-sm font-light text-green-500">
                  Online
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Card>
  )
}

function AverageLoadSection({
  timeframe,
  onTimeframeChange,
}: {
  timeframe: Timeframe
  onTimeframeChange: (value: string) => void
}) {
  return (
    <Card className="p-6">
      <div className="flex flex-wrap gap-2">
        <div className="flex grow items-baseline gap-2 text-slate-600">
          <h3 className="text-2xl font-medium">Average Load</h3>
          <div>with CPU & Disk IO</div>
        </div>
        <Tabs value={timeframe} onValueChange={onTimeframeChange}>
          <TabsList>
            {timeframeOptions.map((option) => (
              <TabsTrigger key={option.value} value={option.value}>
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <Separator className="my-4" />
      <div className="my-8 h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={averageLoadData}
            margin={{
              top: 5,
              right: 30,
              bottom: 5,
              left: -15,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="disk_io"
              stroke="#FFB946"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="cpu"
              stroke="#00AEE7"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="system"
              stroke="#5CCE43"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

function MemoryUsageSection({
  timeframe,
  onTimeframeChange,
}: {
  timeframe: Timeframe
  onTimeframeChange: (value: string) => void
}) {
  return (
    <Card className="p-6">
      <div className="flex flex-wrap gap-2">
        <div className="flex grow items-baseline gap-2 text-slate-600">
          <h3 className="text-2xl font-medium">RAM</h3>
          <div>& SWAP</div>
        </div>
        <Tabs value={timeframe} onValueChange={onTimeframeChange}>
          <TabsList>
            {timeframeOptions.map((option) => (
              <TabsTrigger key={option.value} value={option.value}>
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <Separator className="my-4" />
      <div className="my-8 h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={memoryUsageData}
            margin={{
              top: 5,
              right: 30,
              bottom: 5,
              left: -15,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="swap"
              stroke="#00AEE7"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="ram"
              stroke="#5CCE43"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

function DiskUsageSection({
  timeframe,
  onTimeframeChange,
}: {
  timeframe: Timeframe
  onTimeframeChange: (value: string) => void
}) {
  return (
    <Card className="p-6">
      <div className="flex flex-wrap gap-2">
        <div className="flex grow items-baseline gap-2 text-slate-600">
          <h3 className="text-2xl font-medium">Disk Usage</h3>
          <div>in Total</div>
        </div>
        <Tabs value={timeframe} onValueChange={onTimeframeChange}>
          <TabsList>
            {timeframeOptions.map((option) => (
              <TabsTrigger key={option.value} value={option.value}>
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <Separator className="my-4" />
      <div className="my-8 h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={diskUsageData}
            margin={{
              top: 5,
              right: 30,
              bottom: 5,
              left: -15,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="disk"
              stroke="#5CCE43"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <Card className="overflow-x-auto">
        <Table className="table-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {diskPartitionData.map((partition) => (
              <TableRow key={partition.label} className="*:text-nowrap">
                <TableCell>{partition.label}</TableCell>
                <TableCell>{partition.usage} GB</TableCell>
                <TableCell>{partition.total} GB</TableCell>
                <TableCell className="flex justify-end">
                  <div className="relative h-3 w-full overflow-clip rounded-[3px] bg-muted">
                    <div className="absolute h-full w-2 bg-brand"></div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </Card>
  )
}
