import styles from "./table.module.css";
import type { ComponentProps } from "react";

type TableHeaderCellProps = ComponentProps<'th'>

export function TableHeaderCell({children, ...props}: TableHeaderCellProps) {
  return (
    <th className={styles.tableHeaderCell} {...props}>
      {children}
    </th>
  );
}


