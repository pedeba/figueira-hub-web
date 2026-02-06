import { Link } from "@tanstack/react-router";
import styles from "./sidebar.module.css";
import { useLocation } from "@tanstack/react-router";

interface SidebarNavLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

export function NavLink({to, icon, text}: SidebarNavLinkProps) {
  const pathname = useLocation()
  const isActive = pathname.pathname === to
  return (
    <li key={to}>
      <Link
        to={to}
        className={`${styles.navLink} ${isActive ? styles.active : ''}`}
      >
        <span className={styles.navIcon}>{icon}</span>
        <span className={styles.navText}>{text}</span>
      </Link>
    </li>
  )
}
