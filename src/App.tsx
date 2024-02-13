import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Layout from '@/routes/_layout.tsx'
import Index from '@/routes/index.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NewServerRoute from '@/routes/servers.new.tsx'

const queryClient = new QueryClient()

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<Layout />}>
      <Route index element={<Index />} />
      <Route path="servers">
        <Route path="new" element={<NewServerRoute />} />
      </Route>
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
