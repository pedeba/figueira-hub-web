import { Toast } from 'radix-ui';
import styles from './toast.module.css';

type ToastComponentProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  variant: 'error' | 'success' | 'warning' | 'info';
};

export function ToastComponent(props: ToastComponentProps) {
  const { open, onOpenChange, title, description, variant } = props;
  return (
    <Toast.Root
      className={`${styles.Root} ${styles[variant]}`}
      open={!!open}
      onOpenChange={onOpenChange}
    >
      <Toast.Title className={styles.Title}>{title}</Toast.Title>
      <Toast.Description className={styles.Description}>
        {description}
      </Toast.Description>
    </Toast.Root>
  );
}
