import styles from "./desktop.module.scss";
import { Player as PlayerT } from "../../../interfaces/player";
import { Socket } from "socket.io-client";

import Player from "../../player/player";
import Desk from "../desk/desk";

interface Props {
  players: PlayerT[];
  socket: Socket;
}

export default function Desktop({ players, socket }: Props) {
  const myPlayer = players.find((p) => p.socketId === socket.id) as PlayerT;
  const otherPlayers = players.filter((p) => p.socketId !== socket.id);

  let currentZone = 0;
  let playerIndex = 0;

  const topPlayers: PlayerT[] = [];
  const leftPlayers: PlayerT[] = [];
  const rightPlayers: PlayerT[] = [];
  const bottomPlayers: PlayerT[] = [myPlayer];

  const containers = [topPlayers, leftPlayers, rightPlayers, bottomPlayers];
  const maxSizes = [4, 2, 2, 4];

  while (playerIndex < otherPlayers.length) {
    const player = otherPlayers[playerIndex];
    containers[currentZone].push(player);
    playerIndex++;

    currentZone = (currentZone + 1) % containers.length;

    if (containers[currentZone].length >= maxSizes[currentZone]) {
      currentZone = (currentZone + 1) % containers.length;
    }
  }

  return (
    <section className={styles["content-desktop"]}>
      <div className={styles["content-desktop__top-players"]}>
        {topPlayers.map((p) => (
          <Player key={p.socketId} player={p} />
        ))}
      </div>
      <div className={styles["content-desktop__middle-area"]}>
        <div className={styles["content-desktop__side-players"]}>
          {leftPlayers.map((p) => (
            <Player key={p.socketId} player={p} />
          ))}
        </div>
        <Desk />
        <div className={styles["content-desktop__side-players"]}>
          {rightPlayers.map((p) => (
            <Player key={p.socketId} player={p} />
          ))}
        </div>
      </div>
      <div className={styles["content-desktop__top-players"]}>
        {bottomPlayers.map((p) => p && <Player key={p.socketId} player={p} />)}
      </div>
    </section>
  );
}
