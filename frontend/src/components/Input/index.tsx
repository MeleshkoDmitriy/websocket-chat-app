import type { ComponentPropsWithRef } from "react";
import styles from "./styles.module.less";

interface InputProps extends ComponentPropsWithRef<"input"> {
  type?: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete: string;
  required: boolean;
  className?: string;
}

export const Input = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  autoComplete = "off",
  required = false,
  className,
  ...props
}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      required={required}
      className={`${styles.input} ${className || ""}`}
      {...props}
    />
  );
};
