import { useSelector } from "react-redux";
import Avatar from "../../../../design-system/atoms/avatar/avatar.atom";
import Button from "../../../../design-system/atoms/button/button.atom";
import { RootState } from "../../store/store";
import styles from "./header.module.scss";

export default function Header() {
  const { partyName } = useSelector((state: RootState) => state.party);
  const { username } = useSelector((state: RootState) => state.user);

  return (
    <header className={styles.header}>
      <img
        className={styles.header__logo}
        src="/img/poker.svg"
        alt="Pocker Pragma"
        width={60}
        height={60}
      />
      <h4 className={styles.header__title}>{partyName}</h4>
      <div className={styles.header__badge}>
        <Avatar
          className={styles.header__avatar}
          variant="small"
          initials={username.slice(0, 2) || "PR"}
        />
        <Button
          className={styles.header__button}
          text="Invitar jugadores"
          variant="secondary"
        />
      </div>
    </header>
  );
}
