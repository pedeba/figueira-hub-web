import { Checkbox } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";
import styles from "./checkbox.module.css";
import { useFormContext, Controller } from "react-hook-form";

type CheckBoxProps = {
  label: string,
  id: string,
  name: string,
}

export function CheckBox({id, label, name}: CheckBoxProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={false}
      render={({ field }) => (
        <div className={styles.containerCheckbox}>
          <Checkbox.Root 
            className={styles.Root} 
            id={id} 
            checked={field.value}
            onCheckedChange={field.onChange}
          >
            <Checkbox.Indicator className={styles.Indicator}>
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label className={styles.Label} htmlFor={id}>
            {label}
          </label>
        </div>
      )}
    />
  )
}