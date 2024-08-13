import styles from "./mobile.module.scss";

import { Socket } from "socket.io-client";
import { Player as PlayerT } from "../../../interfaces/player";

import Player from "../../player/player";

interface Props {
  players: PlayerT[];
  socket: Socket;
}

export default function Mobile({ players, socket }: Props) {
  const myPlayer = players.find((p) => p.socketId === socket.id) as PlayerT;
  const otherPlayers = players.filter((p) => p.socketId !== socket.id);

  return (
    <>
      <section className={styles["content-mobile"]}>
        <div className={styles["content-mobile__players"]}>
          {otherPlayers.map((p) => (
            <Player key={p.socketId} player={p} />
          ))}
        </div>
        <div className={styles["content-mobile__my-player"]}>
          {myPlayer && <Player player={myPlayer} />}
        </div>
      </section>
    </>
  );
}
