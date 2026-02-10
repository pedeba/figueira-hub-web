import styles from './sidebar.module.css';

interface SidebarNavProps {
  children: React.ReactNode;
}

export function Nav({ children }: SidebarNavProps) {
  return <nav className={styles.nav}>{children}</nav>;
}
