import React from 'react'
import { cn } from '@/lib/utils.ts'
import { BoxIcon, HomeIcon, SettingsIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigation = [
  { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
]

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
        <BoxIcon color="#00AEE7" />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  {/* TODO: Update primary color */}
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        isActive
                          ? 'bg-gray-50 text-indigo-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon
                          className={cn(
                            isActive
                              ? 'text-indigo-600'
                              : 'text-gray-400 group-hover:text-indigo-600',
                            'h-6 w-6 shrink-0',
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            {/* TODO: Change color based on `isActive` */}
            <a
              href="#"
              className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
            >
              <SettingsIcon
                className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                aria-hidden="true"
              />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
})
