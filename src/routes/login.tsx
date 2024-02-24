import { Logo } from '@/components/Logo.tsx'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export default function LoginRoute() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      // FIXME: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log('login', data)
    },
    onSuccess: () => {
      toast.success('Logged in successfully')
      console.log('Logged in successfully')
    },
    onError: (error) => {
      toast.error('Failed to login', { description: error.message })
      console.error('Failed to login', error)
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    login(values)
  }

  return (
    <div className="flex min-h-dvh flex-1 flex-col justify-center bg-brand-background py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo theme="light" size="lg" />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        className="text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="current-password"
                        className="text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="brand"
                className="w-full font-bold"
                disabled={isLoggingIn}
              >
                {isLoggingIn && (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                )}
                {isLoggingIn ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </Form>
        </div>

        <p className="mt-10 text-center text-sm text-gray-300">
          Don't have an account?{' '}
          <Link to="/signup" className="text-brand">
            Sign Up Now
          </Link>
        </p>
      </div>
    </div>
  )
}
