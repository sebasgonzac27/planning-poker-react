import styles from "./invite.module.scss";
import { toast } from "sonner";
import { IoCloseOutline } from "react-icons/io5";
import Modal from "../../../../design-system/molecules/modal/modal.molecule";
import Button from "../../../../design-system/atoms/button/button.atom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setInviteModal } from "../../reducers/party/partySlice";

export default function Invite() {
  const { inviteModal } = useSelector((state: RootState) => state.party);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const dispatch = useDispatch();

  function handleCloseModal() {
    dispatch(setInviteModal(false));
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Se ha copiado el link al portapapeles.");
      dispatch(setInviteModal(false));
    } catch {
      toast.error("No se ha podido copiar el link al portapapeles.");
    }
  }

  return (
    <>
      {inviteModal && (
        <Modal>
          <Modal.Header className={styles.invite__header}>
            <h2 className={styles.invite__title}>Invitar jugadores</h2>
            <button className={styles.invite__close} onClick={handleCloseModal}>
              <IoCloseOutline />
            </button>
          </Modal.Header>
          <Modal.Body className={styles.invite__body}>
            <p className={styles.invite__url}>{url}</p>
            <Button
              text="Copiar en el portapapeles"
              variant="primary"
              onClick={handleCopyLink}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
