import styles from "./table.module.css";
import type { ComponentProps } from "react";

type TableHeadProps = ComponentProps<'thead'>

export function TableHead({children, ...props}: TableHeadProps) {
  return (
    <thead className={styles.tableHead} {...props}>
      {children}
    </thead>
  );
}
