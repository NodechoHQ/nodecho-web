import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Link, useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useCopyToClipboard } from 'react-use'
import { toast } from 'sonner'
import { ChevronRightIcon } from 'lucide-react'

type Props = {
  serverId: string
  token?: string
}

export function InstallAgentPage({ serverId, token }: Props) {
  const [, copyToClipboard] = useCopyToClipboard()
  const codeBlockRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()

  const onCopyCode = () => {
    copyToClipboard(codeBlockRef.current!.textContent!)
    toast.success('Copied to clipboard')
  }

  return (
    <div className="flex flex-col justify-center">
      <Card className="mx-auto max-w-[600px]">
        <CardHeader>
          <CardTitle className="mx-auto">Install Agent</CardTitle>
          <CardDescription />
        </CardHeader>
        <Separator />
        <CardContent className="mt-4">
          <div className="space-y-8 text-muted-foreground">
            <p>
              Almost done, you only need to install the Nodecho agent on your
              server. The script used is open source and can be viewed on{' '}
              <a
                href={'https://github.com/NodechoHQ/agent'}
                className="font-medium text-primary"
              >
                GitHub
              </a>{' '}
              so you know what we are retrieving from your server.
            </p>
            <p>
              Use following command to install the agent on your server, then go
              to{' '}
              <Link to="/servers" className="font-medium text-primary">
                Manage Servers
              </Link>{' '}
              and wait until the initial data has been collected.
            </p>
          </div>

          <div className="mt-4 overflow-clip rounded-md">
            <pre className="whitespace-pre-wrap bg-brand-background p-6">
              <code
                ref={codeBlockRef}
                className="select-all break-words text-white"
              >
                <span className="text-brand">wget</span> -N
                --no-check-certificate
                https://raw.githubusercontent.com/NodechoHQ/agent/master/install.sh{' '}
                <span className="text-gray-400">&&</span>{' '}
                <span className="text-brand">bash</span> install.sh {token}
              </code>
            </pre>
            <Button
              className="w-full rounded-none font-bold"
              size="lg"
              onClick={onCopyCode}
            >
              Copy Installation Command
            </Button>
          </div>
        </CardContent>
        <CardFooter />
      </Card>

      <Button
        className="mx-auto mt-8 w-full max-w-[600px] bg-brand-background-700 text-slate-300 hover:bg-brand-background-500"
        onClick={() => navigate(`/servers/${serverId}`)}
      >
        I've installed the agent, continue to server details
        <ChevronRightIcon className="ml-2 size-4" />
      </Button>
    </div>
  )
}
