import styles from "./table.module.css";
import type { ComponentProps } from "react";

type TableRowProps = ComponentProps<'tr'>

export function TableRow({children, ...props}: TableRowProps) {
  return (
    <tr className={styles.tableRow} {...props}>
      {children}
    </tr>
  );
}
