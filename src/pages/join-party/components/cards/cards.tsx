import styles from "./cards.module.scss";
import Card from "../../../../design-system/atoms/card/card.atom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { PlayerRole } from "../../enums/player-role";
import { setVote } from "../../reducers/user/userSlice";
import { vote as Vote } from "../../../../services/user/user";
import { socket } from "../../../../utils/socket-instance/socket-instance";

export default function Cards() {
  const { role, vote } = useSelector((state: RootState) => state.user);
  const { partyId, distribution } = useSelector(
    (state: RootState) => state.party
  );
  const dispatch = useDispatch();

  const handleCardClick = async (point: string) => {
    let votePoint: string | null;
    if (vote === point) {
      votePoint = null;
    } else {
      votePoint = point;
    }

    dispatch(setVote(votePoint));
    await Vote({
      vote: votePoint as string,
      roomId: partyId,
      userId: socket.id ?? "",
    });
  };

  return (
    <>
      {role === PlayerRole.Player && (
        <div className={styles.cards}>
          <h3 className={styles.cards__title}>Elige una carta 👇</h3>
          <div className={styles.cards__container}>
            {distribution?.values.map((point, index) => (
              <Card
                className={styles.cards__card}
                variant="large"
                fill={point === vote}
                key={index}
                onClick={() => handleCardClick(point)}
              >
                {point}
              </Card>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
