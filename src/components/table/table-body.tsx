import styles from "./table.module.css";
import type { ComponentProps } from "react";

type TableBodyProps = ComponentProps<'tbody'>

export function TableBody({children, ...props}: TableBodyProps) {
  return (
    <tbody className={styles.tableBody} {...props}>
      {children}
    </tbody>
  );
}
