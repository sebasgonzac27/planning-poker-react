import styles from "./radio-group.module.scss";
import { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  children: React.ReactNode;
}

export default function RadioGroup({ children }: Props) {
  return <div className={styles.group}>{children}</div>;
}
