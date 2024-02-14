import { NewServerForm } from '@/components/server/NewServerForm.tsx'
import { useNavigate } from 'react-router-dom'

export default function NewServerRoute() {
  const navigate = useNavigate()

  const onCreateServer = (server: { id: string; token: string }) => {
    navigate(`/servers/${server.id}/install-agent`, {
      replace: true,
      state: { token: server.token },
    })
  }

  return <NewServerForm onCreateServer={onCreateServer} />
}
