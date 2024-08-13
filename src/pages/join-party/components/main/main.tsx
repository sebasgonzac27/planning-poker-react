import styles from "./main.module.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setPartyId,
  setPartyName,
  setPlayers,
} from "../../reducers/party/partySlice";
import Header from "../header/header";
import NewPlayer from "../new-player/new-player";
import { socket } from "../../../../utils/socket-instance/socket-instance";
import Playground from "../playground/playground";
import { Player } from "../../interfaces/player";
import {
  setIsOwner,
  setRole,
  setUsername,
} from "../../reducers/user/userSlice";

interface Props {
  partyId: string;
}

export default function Main({ partyId }: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPartyId(partyId));

    const updatePlayers = (players: Player[]) => {
      dispatch(setPlayers(players));
      const me = players.find((p: Player) => p.socketId === socket.id);
      if (me) {
        dispatch(setUsername(me.username));
        dispatch(setRole(me.role));
        dispatch(setIsOwner(me.isOwner));
      }
    };

    socket.on("join-party", ({ party, players }) => {
      dispatch(setPartyName(party.name));
      updatePlayers(players);
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={styles.join}>
      <Header />
      <NewPlayer />
      <Playground />
    </main>
  );
}
