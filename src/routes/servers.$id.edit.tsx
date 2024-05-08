import { ServerForm } from '@/components/server/ServerForm'
import { Server } from '@/types/dto'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditServerRoute() {
  const navigate = useNavigate()
  const { sid } = useParams()

  if (sid === undefined) {
    throw new Error('Server ID is required')
  }

  const onUpdateServer = (server: Server) => {
    navigate(`/servers/${server.id}`)
  }

  return <ServerForm serverId={+sid} onDone={onUpdateServer} />
}
