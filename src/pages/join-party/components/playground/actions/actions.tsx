import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Button from "../../../../../design-system/atoms/button/button.atom";
import { getAverage, resetParty } from "../../../../../services/party/party";

export default function Actions() {
  const { revealed, partyId, players } = useSelector(
    (state: RootState) => state.party
  );
  const { isOwner } = useSelector((state: RootState) => state.user);

  const votesCount = useMemo(() => {
    return players.reduce((acc, player) => {
      if (player.vote) {
        acc++;
      }
      return acc;
    }, 0);
  }, [players]);

  const handleReveal = async () => {
    await getAverage(partyId);
  };

  const handleReset = async () => {
    await resetParty(partyId);
  };

  return (
    <>
      {!revealed && isOwner && votesCount > 0 && (
        <Button
          text="Revelar cartas"
          variant="tertiary"
          onClick={handleReveal}
        />
      )}
      {revealed && isOwner && (
        <Button
          text="Nueva votación"
          variant="tertiary"
          onClick={handleReset}
        />
      )}
    </>
  );
}
