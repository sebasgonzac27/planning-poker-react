import { useSelector } from "react-redux";
import Card from "../../../../design-system/atoms/card/card.atom";
import styles from "./stats.module.scss";
import { useCallback } from "react";
import { RootState } from "../../store/store";

export default function Stats() {
  const { revealed, average, totalCount } = useSelector(
    (state: RootState) => state.party
  );
  const formatNumber = useCallback((number: number) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(number);
  }, []);
  return (
    revealed && (
      <div className={styles.stats}>
        {Object.entries(totalCount).map(([key, value], index) => (
          <div key={index} className={styles.stats__result}>
            <Card variant="large">{key}</Card>
            <span>{value} votos</span>
          </div>
        ))}
        <div className={styles.stats__average}>
          <h3 className={styles.average__title}>Promedio</h3>
          <span className={styles.average__value}>{formatNumber(average)}</span>
        </div>
      </div>
    )
  );
}
