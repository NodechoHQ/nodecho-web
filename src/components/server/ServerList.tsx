import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/skeleton.tsx'
import * as React from 'react'
import { cn } from '@/lib/utils.ts'
import { ServerCard } from '@/components/server/ServerCard.tsx'
import { Link } from 'react-router-dom'
import * as apiService from '@/services/api-service'

export function ServerList() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['servers'],
    queryFn: () => apiService.fetchServers(),
  })

  if (isPending) {
    return (
      <ListContainer>
        {Array(10)
          .fill(0)
          .map((_, idx) => (
            <Skeleton key={idx} className="h-56 bg-brand-background-400" />
          ))}
      </ListContainer>
    )
  }

  if (isError) {
    return (
      <div>
        <h3>Failed to load servers</h3>
        <p>Reason: {error.message}</p>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex h-72 w-full items-center justify-center rounded-md bg-brand-background-700 p-8 shadow">
        <p className="text-gray-300">
          You currently do not have any servers setup. Get started by creating a{' '}
          <button type="button" className="-m-2 p-2 text-brand">
            New Server
          </button>
          .
        </p>
      </div>
    )
  }

  return (
    <ListContainer className="empty:hidden">
      {data.map((server) => (
        <Link to={`/servers/${server.id}`} key={server.id}>
          <ServerCard server={server} />
        </Link>
      ))}
    </ListContainer>
  )
}

function ListContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <ul
      className={cn(
        'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
        className,
      )}
    >
      {children}
    </ul>
  )
}
