import styles from "./sidebar.module.css";

interface SidebarRootProps {
  children: React.ReactNode;
}

export function Root({children}: SidebarRootProps) {
  return (
    <aside className={styles.sidebar}>
      {children}
    </aside>
  );
}
