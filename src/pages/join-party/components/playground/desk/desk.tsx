import styles from "./desk.module.scss";

export default function Desk() {
  return (
    <div className={styles.table}>
      <div className={styles.table__middle}>
        <div className={styles.table__inner}></div>
      </div>
    </div>
  );
}
