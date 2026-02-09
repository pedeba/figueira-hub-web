import styles from './table.module.css';
import type { ComponentProps } from 'react';

type TableProps = ComponentProps<'table'>;

export function Table({ children, ...props }: TableProps) {
  return (
    <table className={styles.table} {...props}>
      {children}
    </table>
  );
}
