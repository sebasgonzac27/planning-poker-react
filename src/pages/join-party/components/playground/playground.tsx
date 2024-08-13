import styles from "./playground.module.scss";

import useWindowDimensions from "../../hooks/use-window-dimensions/useWindowDimensions";

import Desktop from "./desktop/desktop";
import Mobile from "./mobile/mobile";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { socket } from "../../../../utils/socket-instance/socket-instance";

export default function Playground() {
  const { players } = useSelector((state: RootState) => state.party);

  const { width } = useWindowDimensions();

  return (
    <div className={styles.playground}>
      {width > 868 ? (
        <Desktop players={players} socket={socket} />
      ) : (
        <Mobile players={players} socket={socket} />
      )}
    </div>
  );
}
