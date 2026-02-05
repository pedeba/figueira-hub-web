import styles from "./sidebar.module.css";

interface SidebarNavListProps {
  children: React.ReactNode;
}

export function NavList({children}: SidebarNavListProps) {

  return (
    <ul className={styles.navList}>
      {children}
    </ul>
  );
}
