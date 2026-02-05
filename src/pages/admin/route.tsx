import { createFileRoute, redirect } from '@tanstack/react-router'
import { getAuthUser } from '../../lib/auth'
import { Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const user = await getAuthUser(context.queryClient)
    
    if (!user?.id) {
      throw redirect({ to: '/login', search: { registered: undefined } })
    }

    if (user?.role !== 'admin') {
      throw redirect({ to: '/' })
    }
  }
})

function RouteComponent() {
  return (
    <div>
      <div>Admin Layout</div>
      <Outlet />
    </div>
  )
}
