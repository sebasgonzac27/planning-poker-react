import styles from "./main.module.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPartyId } from "../../reducers/party/partySlice";
import Header from "../header/header";
import NewPlayer from "../new-player/new-player";
import { socket } from "../../../../utils/socket-instance/socket-instance";

interface Props {
  partyId: string;
}

export default function Main({ partyId }: Props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPartyId(partyId));
    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={styles.join}>
      <Header />
      <NewPlayer />
    </main>
  );
}
