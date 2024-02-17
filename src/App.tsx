import {
  createBrowserRouter,
  createRoutesFromChildren,
  redirect,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Layout from '@/routes/_layout.tsx'
import Servers from '@/routes/servers.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NewServer from '@/routes/servers.new.tsx'
import ServerDetail from '@/routes/servers.$id.tsx'
import InstallAgent from '@/routes/servers.$id.install-agent.tsx'

const queryClient = new QueryClient()

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route element={<Layout />}>
      <Route path="/" loader={() => redirect('/servers')} />
      <Route path="/servers" element={<Servers />} />
      <Route path="/servers/new" element={<NewServer />} />
      <Route path="/servers/:sid" element={<ServerDetail />} />
      <Route path="/servers/:sid/install-agent" element={<InstallAgent />} />
    </Route>,
  ),
)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
