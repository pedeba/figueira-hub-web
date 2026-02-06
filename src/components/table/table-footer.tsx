import styles from "./table.module.css";
import type { ComponentProps } from "react";

type TableFooterProps = ComponentProps<'tfoot'>

export function TableFooter({children, ...props}: TableFooterProps) {
  return (
    <tfoot className={styles.tableFooter} {...props}>
      {children}
    </tfoot>
  );
}
