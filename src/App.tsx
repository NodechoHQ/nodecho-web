import {
  createBrowserRouter,
  createRoutesFromChildren,
  LoaderFunction,
  redirect,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { RootLayout, AppLayout } from '@/routes/_layout.tsx'
import Servers from '@/routes/servers.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NewServer from '@/routes/servers.new.tsx'
import EditServer from '@/routes/servers.$id.edit.tsx'
import ServerDetail from '@/routes/servers.$id.tsx'
import InstallAgent from '@/routes/servers.$id.install-agent.tsx'
import Login from '@/routes/login.tsx'
import SignUp from '@/routes/signup.tsx'
import { LocalStorageKeys } from './lib/constants'
import SignUpVerifyRoute from './routes/signup.verify'
import * as apiService from './services/api-service'

const queryClient = new QueryClient()

const appLoader: LoaderFunction = async () => {
  const accessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN)
  if (!accessToken) {
    return redirect('/login')
  }
  const profile = await queryClient.fetchQuery({
    queryKey: ['profile'],
    queryFn: () => apiService.fetchProfile(),
  })
  if (!profile.emailVerifiedAt) {
    return redirect('/signup/verify')
  }
  return null
}

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route element={<RootLayout />}>
      <Route element={<AppLayout />} loader={appLoader}>
        <Route path="/" loader={() => redirect('/servers')} />
        <Route path="/servers" element={<Servers />} />
        <Route path="/servers/new" element={<NewServer />} />
        <Route path="/servers/:sid" element={<ServerDetail />} />
        <Route path="/servers/:sid/edit" element={<EditServer />} />
        <Route path="/servers/:sid/install-agent" element={<InstallAgent />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signup/verify" element={<SignUpVerifyRoute />} />
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
