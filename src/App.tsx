import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Layout from '@/routes/_layout.tsx'
import Index from '@/routes/index.tsx'

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<Layout />}>
      <Route index element={<Index />} />
    </Route>,
  ),
)

function App() {
  return <RouterProvider router={router} />
}

export default App
