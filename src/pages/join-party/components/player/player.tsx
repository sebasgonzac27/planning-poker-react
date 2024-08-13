import Avatar from "../../../../design-system/atoms/avatar/avatar.atom";
import Card from "../../../../design-system/atoms/card/card.atom";
import styles from "./player.module.scss";
import { Player as PlayerT } from "../../interfaces/player";
import { PlayerRole } from "../../enums/player-role";

export default function Player({ player }: { player: PlayerT }) {
  return (
    <div className={styles.player}>
      {player.role === PlayerRole.Player && (
        <Card
          className={styles.player__card}
          variant="small"
          fill={player.vote != null}
        >
          {player.vote}
        </Card>
      )}
      {player.role === PlayerRole.Viewer && (
        <Avatar variant="large" initials={player.username.slice(0, 2)} />
      )}
      <span className={styles.player__name}>{player.username}</span>
    </div>
  );
}
