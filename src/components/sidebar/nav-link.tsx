import { Link } from "@tanstack/react-router";
import styles from "./sidebar.module.css";

interface SidebarNavLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

export function NavLink({to, icon, text}: SidebarNavLinkProps) {
  return (
    <li key={to}>
      <Link
        to={to}
        className={styles.navLink}
      >
        <span className={styles.navIcon}>{icon}</span>
        <span className={styles.navText}>{text}</span>
      </Link>
    </li>
  )
}
