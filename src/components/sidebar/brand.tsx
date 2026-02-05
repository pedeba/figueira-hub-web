import styles from "./sidebar.module.css";

interface SidebarBrandProps {
  logo: string;
}

export function Brand({logo}: SidebarBrandProps) {
  return (
    <div className={styles.brand}>
      <img src={logo} alt="Logo" className={styles.logo} />
    </div>
  );
}
