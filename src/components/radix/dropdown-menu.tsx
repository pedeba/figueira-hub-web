import * as React from 'react';
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui';
import styles from './dropdown-menu.module.css';

export const DropdownMenu = DropdownMenuPrimitive.Root;

export const DropdownMenuTrigger = React.forwardRef(
  (
    {
      children,
      ...props
    }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>,
    forwardedRef: React.Ref<HTMLButtonElement>,
  ) => {
    return (
      <DropdownMenuPrimitive.Trigger
        className={styles.trigger}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </DropdownMenuPrimitive.Trigger>
    );
  },
);

export const DropdownMenuContent = React.forwardRef(
  (
    {
      children,
      ...props
    }: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>,
    forwardedRef: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          className={styles.content}
          sideOffset={5}
          {...props}
          ref={forwardedRef}
        >
          {children}
          <DropdownMenuPrimitive.Arrow className={styles.arrow} />
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    );
  },
);

type DropdownMenuItemProps = React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> & {
  variant?: 'default' | 'danger';
};

export const DropdownMenuItem = React.forwardRef(
  (
    { children, variant = 'default', ...props }: DropdownMenuItemProps,
    forwardedRef: React.Ref<HTMLDivElement>,
  ) => {
    const className =
      `${styles.item} ${variant === 'danger' ? styles.itemDanger : ''}`.trim();
    return (
      <DropdownMenuPrimitive.Item
        className={className}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </DropdownMenuPrimitive.Item>
    );
  },
);
