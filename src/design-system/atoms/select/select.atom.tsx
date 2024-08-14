import styles from "./select.module.scss";
import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"select"> {
  label: string;
  name: string;
  id: string;
  children: ReactNode;
}

export default function Select({ label, name, id, children, ...props }: Props) {
  return (
    <div className={styles.select}>
      <label className={styles.select__label} htmlFor={id}>
        {label}
      </label>
      <select className={styles.select__field} name={name} id={id} {...props}>
        {children}
      </select>
    </div>
  );
}
