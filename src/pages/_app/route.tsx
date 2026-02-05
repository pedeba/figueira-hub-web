import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { getAuthUser } from '../../lib/auth'
import { useAuth } from '../../hooks/use-auth'

export const Route = createFileRoute('/_app')({
  beforeLoad: async ({ context }) => {
    const user = await getAuthUser(context.queryClient)
    
    if (!user?.id) {
      throw redirect({to: '/login', search: {registered: undefined}})
    }
  },
  component: AppLayout,
})

function AppLayout() {
  const { logout, user } = useAuth()
  return (
    <div>
      <h1>App Layout</h1>
      <p>User: {user?.name}</p>
      <nav>
        <button onClick={() => logout()}>Logout</button>
      </nav>
      <Outlet />
    </div>
  )
}
