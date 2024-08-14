import styles from "./menu.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import React, { useState } from "react";
import { toggleRole } from "../../../../services/user/user";
import { PlayerRole } from "../../enums/player-role";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { socket } from "../../../../utils/socket-instance/socket-instance";
import { setMenuModal } from "../../reducers/party/partySlice";
import Modal from "../../../../design-system/molecules/modal/modal.molecule";
import Select from "../../../../design-system/atoms/select/select.atom";
import Button from "../../../../design-system/atoms/button/button.atom";

export default function Menu() {
  const { menuModal, partyId } = useSelector((state: RootState) => state.party);
  const { role } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const [selectedRole, setSelectedRole] = useState<PlayerRole>(role);

  const handleChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    const value = target.value as PlayerRole;
    setSelectedRole(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedRole !== role) {
      await toggleRole({
        role: selectedRole,
        roomId: partyId,
        userId: socket.id!,
      });
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    dispatch(setMenuModal(false));
  };

  return (
    <>
      {menuModal && (
        <Modal>
          <Modal.Header className={styles.menu__header}>
            <h2 className={styles.menu__title}>Configuración</h2>
            <button
              data-testid="close-button"
              className={styles.menu__close}
              onClick={handleCloseModal}
            >
              <IoCloseOutline />
            </button>
          </Modal.Header>
          <Modal.Body className={styles.menu__body}>
            <form className={styles.menu__form} onSubmit={handleSubmit}>
              <Select
                data-testid="role-select"
                label="Rol"
                name="role"
                id="role"
                value={selectedRole}
                onChange={handleChangeRole}
              >
                <option value={PlayerRole.Player}>Jugador</option>
                <option value={PlayerRole.Viewer}>Espectador</option>
              </Select>
              <Button text="Guardar" variant="primary" />
            </form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
