import { ServerForm } from '@/components/server/ServerForm'
import { Server } from '@/types/dto'
import { useNavigate } from 'react-router-dom'

export default function NewServerRoute() {
  const navigate = useNavigate()

  const onCreateServer = (server: Server) => {
    navigate(`/servers/${server.id}/install-agent`, {
      replace: true,
      state: { token: server.token },
    })
  }

  return <ServerForm serverId={null} onDone={onCreateServer} />
}
