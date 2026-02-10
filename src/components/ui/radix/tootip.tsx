import { Tooltip as TooltipPrimitive } from 'radix-ui';
import styles from './tooltip.module.css';

type TooltipProps = {
  children: React.ReactNode;
  content: string;
};
export function Tooltip(props: TooltipProps) {
  const { children, content } = props;
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root delayDuration={200}>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className={styles.content}
            side="top"
            align="center"
            sideOffset={5}
          >
            {content}
            <TooltipPrimitive.Arrow
              className={styles.arrow}
              width={11}
              height={5}
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
