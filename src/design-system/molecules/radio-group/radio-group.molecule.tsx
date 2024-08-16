import styles from "./radio-group.module.scss";
import { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<"div"> {
  children: ReactNode;
}

export default function RadioGroup({ children }: Props) {
  return <div className={styles.group}>{children}</div>;
}
