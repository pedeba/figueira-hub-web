import { unstable_PasswordToggleField as PassWordToggleField } from "radix-ui";
import { Eye, EyeOff } from "lucide-react";
import styles from './password-toggle-field.module.css'
import { useFormContext } from "react-hook-form";
import type { ComponentProps } from "react";

type PasswordToggleFieldProps = Omit<ComponentProps<'input'>, 'autoComplete'> & {
  name: string
}

export function PasswordToggleField(props: PasswordToggleFieldProps) {

  const { register } = useFormContext();
  return (
    <PassWordToggleField.Root>
		<div className={styles.Root}>
			<PassWordToggleField.Input className={styles.Input} {...register(props.name)} {...props}/>
			<PassWordToggleField.Toggle className={styles.Toggle}>
				<PassWordToggleField.Icon
					visible={<Eye size={18} />}
					hidden={<EyeOff size={18} />}
				/>
			</PassWordToggleField.Toggle>
		</div>
	</PassWordToggleField.Root>
  )
}