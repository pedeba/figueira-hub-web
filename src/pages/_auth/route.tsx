import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import styles from './route.module.css'
import { getAuthUser } from '../../lib/auth'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    const user = await getAuthUser(context.queryClient)

    if (user?.id) {
      throw redirect({ to: '/' })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className={styles.container}>
      <main className={styles.formSide}>
        <div className={styles.formContainer}>
          {/* Área do formulário */}
          <div className={styles.formCard}>
            <Outlet />
          </div>

          {/* Footer */}
          <p className={styles.footer}>
            © {new Date().getFullYear()} Finance Flow. Todos os direitos reservados.
          </p>
        </div>
      </main>
    </div>
  )
}
