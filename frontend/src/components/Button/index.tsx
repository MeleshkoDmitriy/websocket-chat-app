import type { ComponentPropsWithRef } from "react";
import styles from "./styles.module.less";

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  text: string;
}
export const Button = ({ text, ...props }: ButtonProps) => {
  return <button {...props} className={styles.button}>{text}</button>;
};
