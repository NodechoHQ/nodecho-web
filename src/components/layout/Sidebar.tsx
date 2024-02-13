import React from 'react'
import { cn } from '@/lib/utils.ts'
import { BookOpenTextIcon, BoxIcon, HomeIcon, SettingsIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigations = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
  {
    name: 'Documentation',
    href: '/docs',
    icon: BookOpenTextIcon,
    current: false,
  },
]

const settings: (typeof navigations)[number] = {
  name: 'Settings',
  href: '/settings',
  icon: SettingsIcon,
  current: false,
}

interface SidebarProps extends React.ComponentProps<'aside'> {}

export const Sidebar = React.forwardRef<
  React.ElementRef<'aside'>,
  SidebarProps
>(({ className, ...props }, ref) => {
  return (
    <aside
      ref={ref}
      className={cn('flex grow flex-col gap-y-5 bg-white pb-4', className)}
      {...props}
    >
      <div className="flex h-16 shrink-0 items-center">
        <BoxIcon className="text-brand" />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigations.map((item) => (
                <li key={item.name}>
                  <NavigationLink item={item} />
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-2 mt-auto">
            <NavigationLink item={settings} />
          </li>
        </ul>
      </nav>
    </aside>
  )
})

function NavigationLink({ item }: { item: (typeof navigations)[number] }) {
  return (
    <NavLink
      to={item.href}
      className={({ isActive }) =>
        cn(
          'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
          isActive ? 'bg-gray-50' : 'hover:bg-gray-50',
        )
      }
    >
      {({ isActive }) => (
        <>
          <item.icon
            className={cn(
              'size-6 shrink-0',
              isActive ? 'text-brand' : 'text-gray-400 group-hover:text-brand',
            )}
            aria-hidden="true"
          />
          <div
            className={cn(
              isActive ? 'text-brand' : 'text-gray-700 group-hover:text-brand',
            )}
          >
            {item.name}
          </div>
        </>
      )}
    </NavLink>
  )
}
