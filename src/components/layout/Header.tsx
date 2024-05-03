import React from 'react'
import { cn } from '@/lib/utils.ts'
import { BellIcon, ChevronDownIcon, LogOutIcon, MenuIcon } from 'lucide-react'
import { Separator } from '@/components/ui/separator.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx'
import { Logo } from '@/components/Logo.tsx'
import { useMutation } from '@tanstack/react-query'
import { LocalStorageKeys } from '@/lib/constants'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface HeaderProps extends React.ComponentProps<'header'> {
  onClickMenu: () => void
}

export const Header = React.forwardRef<React.ElementRef<'header'>, HeaderProps>(
  ({ className, onClickMenu, ...props }, ref) => {
    const navigate = useNavigate()

    const { mutate: logout } = useMutation({
      mutationFn: async () => {
        localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN)
        navigate('/login')
      },
      onSuccess: () => {
        toast.success('Logged out successfully')
        console.log('Logged out successfully')
      },
      onError: (error) => {
        toast.error('Failed to logout', { description: error.message })
        console.error('Failed to logout', error)
      },
    })

    return (
      <header
        ref={ref}
        className={cn(
          'flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8',
          className,
        )}
        {...props}
      >
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={onClickMenu}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>

        <Separator className="h-6 w-px lg:hidden" />

        <Logo className="lg:hidden" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="flex flex-1"></div>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            <Separator
              orientation="vertical"
              className="hidden lg:block lg:h-6 lg:w-px"
            />

            {/* Profile dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full bg-gray-50"
                    src="https://i.pravatar.cc/300"
                    alt=""
                  />
                  <span className="hidden lg:flex lg:items-center">
                    <span
                      className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                      aria-hidden="true"
                    >
                      Tom Cook
                    </span>
                    <ChevronDownIcon
                      className="ml-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => logout()}>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    )
  },
)
