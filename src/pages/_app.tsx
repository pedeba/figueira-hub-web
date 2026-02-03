import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { getAuthUser } from '../lib/auth'

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context }) => {
    const user = await getAuthUser(context.queryClient)
    
    if (!user?.id) {
      throw redirect({ to: '/login' })
    }
  },
  component: AppLayout,
})

function AppLayout() {
  return (
    <div>
      <h1>App Layout</h1>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Outlet />
    </div>
  )
}
