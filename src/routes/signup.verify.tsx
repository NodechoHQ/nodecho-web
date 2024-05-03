import { Logo } from '@/components/Logo.tsx'
import { Button } from '@/components/ui/button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import * as apiService from '@/services/api-service'
import { Separator } from '@/components/ui/separator'
import { useEffect } from 'react'

export default function SignUpVerifyRoute() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const navigate = useNavigate()

  const { mutate: verifyToken } = useMutation({
    mutationFn: (token: string) => apiService.verifyToken(token),
    onSuccess: () => {
      toast.success('Email verified successfully')
      console.log('Email verified successfully')
      navigate('/')
    },
    onError: (error) => {
      toast.error('Failed to verify email', { description: error.message })
      console.error('Failed to verify email', error)
    },
  })

  // verifying token when token is not null
  useEffect(() => {
    if (token) {
      verifyToken(token)
    }
  }, [token])

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => apiService.fetchProfile(),
  })

  const { mutate: sendEmail, isPending: isSendingEmail } = useMutation({
    mutationFn: () => apiService.sendVerificationEmail(),
    onSuccess: () => {
      toast.success('Email sent successfully')
    },
    onError: (error) => {
      toast.error('Failed to send email', { description: error.message })
    },
  })

  return (
    <div className="flex min-h-dvh flex-1 flex-col justify-center bg-brand-background py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo theme="light" size="lg" />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <div className="text-center text-3xl font-bold">Almost Done</div>

          <Separator className="mt-6" />

          <p className="my-6 text-muted-foreground">
            An email verification code has been sent to{' '}
            <span className="font-bold text-primary">
              {profileQuery.data?.email ?? 'loading...'}
            </span>
            , just click the included link to activate your account.
          </p>

          <div className="rounded-md bg-primary px-6 py-4 text-white">
            Please do not forget to check your spam folder in case you didn't
            receive the email.
          </div>
        </div>

        <Button
          className="mt-10 w-full text-sm text-gray-300"
          variant="ghost"
          disabled={isSendingEmail}
          onClick={() => sendEmail()}
        >
          {isSendingEmail ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Sending Email...
            </>
          ) : (
            <>Didn't get the email? Resend Email</>
          )}
        </Button>
      </div>
    </div>
  )
}
