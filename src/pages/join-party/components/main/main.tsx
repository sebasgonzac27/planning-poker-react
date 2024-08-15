import styles from "./main.module.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setAverage,
  setDistribution,
  setPartyId,
  setPartyName,
  setPlayers,
  setRevealed,
  setTotalCount,
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
  setVote,
} from "../../reducers/user/userSlice";
import Cards from "../cards/cards";
import Stats from "../stats/stats";
import Invite from "../invite/invite";
import Menu from "../menu/menu";

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
      dispatch(setDistribution(party.distribution));
      updatePlayers(players);
    });

    socket.on("update-players", ({ players }) => {
      updatePlayers(players);
    });

    socket.on("reveal-cards", ({ average, votesCount }) => {
      dispatch(setAverage(average));
      dispatch(setTotalCount(votesCount));
      dispatch(setRevealed(true));
    });

    socket.on("reset-party", ({ players }) => {
      updatePlayers(players);
      dispatch(setVote(null));
      dispatch(setAverage(0));
      dispatch(setRevealed(false));
    });

    socket.on("update-distribution", ({ distribution }) => {
      dispatch(setDistribution(distribution));
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
      <Cards />
      <Stats />
      <Invite />
      <Menu />
    </main>
  );
}
