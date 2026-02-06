import styles from "./table.module.css";
import type { ComponentProps } from "react";

type TableCellProps = ComponentProps<'td'>

export function TableCell({children, ...props}: TableCellProps) {
  return (
    <td className={styles.tableCell} {...props}>
      {children}
    </td>
  );
}
