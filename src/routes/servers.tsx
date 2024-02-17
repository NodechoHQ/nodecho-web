import { Input } from '@/components/ui/input.tsx'
import { PlusCircleIcon, TagIcon } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button.tsx'
import { ServerList } from '@/components/server/ServerList.tsx'
import { Link } from 'react-router-dom'

const data = {
  serverCount: 3,
  serverLimit: 10,
}

export default function ServersRoute() {
  return (
    <>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex grow flex-col gap-1">
            <h1 className="text-2xl">Manage Servers</h1>
            <p className="text-sm text-gray-400">
              You have{' '}
              <span className="text-brand">
                {data.serverCount} of {data.serverLimit}
              </span>{' '}
              servers in your account
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

            <Link
              to="/servers/new"
              className={buttonVariants({ variant: 'brand' })}
            >
              <PlusCircleIcon className="mr-2 size-5" />
              New Server
            </Link>
          </div>
        </div>

        <ServerList />
      </div>
    </>
  )
}
