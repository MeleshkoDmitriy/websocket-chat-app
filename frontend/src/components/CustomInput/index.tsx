import type { ComponentPropsWithoutRef, FC } from "react";
import styles from "./CustomInput.module.less";

interface CustomInputProps extends ComponentPropsWithoutRef<"input"> {
  value: string;
}

export const CustomInput: FC<CustomInputProps> = ({
  value,
  ...props
}) => {
  return (
    <div className={styles.container}>
      <input type="text" value={value} {...props} />
    </div>
  );
};
