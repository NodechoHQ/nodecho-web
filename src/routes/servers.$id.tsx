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
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx'

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
  console.log('serverId: ', sid)

  const [networkUsageTimeframe, setNetworkUsageTimeframe] =
    useState<Timeframe>('hourly')

  const handleNetworkUsageTimeframeChange = (value: string) => {
    if (value === 'monthly' || value === 'daily' || value === 'hourly') {
      setNetworkUsageTimeframe(value)
    } else {
      setNetworkUsageTimeframe('hourly')
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-2xl">{data.name}</h2>
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

        <Button variant="brand">
          <EditIcon strokeWidth={3} className="mr-2 size-4" />
          Edit Server
        </Button>
      </div>

      <div className="mt-8 grid grid-flow-col grid-cols-1 grid-rows-12 gap-2 text-sm md:grid-cols-2 md:grid-rows-6">
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

      <div className="mt-8 flex flex-col gap-y-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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

          <Card className="space-y-3 p-6">
            <h3 className="text-sm font-medium text-slate-400">
              Overall disk usage
            </h3>
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
        </div>

        {/* Network Usage */}
        <Card className="p-6">
          <div className="flex flex-wrap gap-2">
            <div className="flex grow items-baseline gap-2 text-slate-600">
              <h3 className="text-2xl font-medium">Network Usage</h3>
              <div>on eth0</div>
            </div>
            <Tabs
              value={networkUsageTimeframe}
              onValueChange={handleNetworkUsageTimeframeChange}
            >
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
            <table className="w-full table-auto">
              <thead className="border-b">
                <tr className="*:px-4 *:py-2 *:text-start *:font-medium *:text-neutral-400">
                  <th className="flex items-baseline gap-1.5">
                    Network Information
                    <div className="text-sm font-light">
                      by <a className="text-brand">Maxmind</a>
                    </div>
                  </th>
                  <th>IPv4</th>
                  <th>IPv6</th>
                  <th className="flex items-center">
                    Total
                    <ArrowUpDownIcon className="ml-1 size-4" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="*:px-4 *:py-2 *:text-slate-700">
                  <td>Canada AS12345 OVH Systems</td>
                  <td>192.168.0.1</td>
                  <td>2024:0217:19:3223::1</td>
                  <td>2745.47 MB</td>
                </tr>
              </tbody>
            </table>
          </Card>
        </Card>
      </div>
    </div>
  )
}
