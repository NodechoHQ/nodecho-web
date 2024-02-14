import { useLocation, useParams } from 'react-router-dom'
import { InstallAgentPage } from '@/components/server/InstallAgentPage.tsx'

export default function InstallAgentRoute() {
  const { sid } = useParams()
  const location = useLocation()
  const token = location.state?.token as string | undefined

  if (!sid) throw new Error('Server ID is required')

  return <InstallAgentPage serverId={sid} token={token} />
}
