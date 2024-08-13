import { useEffect, useState } from "react";
import { Player } from "../../interfaces/player";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { socket } from "../../../../utils/socket-instance/socket-instance";

export default function useSplitPlayers() {
  const { players } = useSelector((state: RootState) => state.party);
  const [topPlayers, setTopPlayers] = useState<Player[]>([]);
  const [middlePlayers, setMiddlePlayers] = useState<Player[]>([]);
  const [bottomPlayers, setBottomPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const splitPlayers = () => {
      const playersCopy = [...players].filter((p) => p.socketId !== socket.id);
      const top = playersCopy?.slice(0, 3);
      const middle = playersCopy?.slice(3, 5);
      const bottom = playersCopy?.slice(5, 8);

      setTopPlayers(top);
      setMiddlePlayers(middle);
      setBottomPlayers(bottom);
    };

    splitPlayers();
  }, [players]);

  return {
    topPlayers,
    middlePlayers,
    bottomPlayers,
  };
}
