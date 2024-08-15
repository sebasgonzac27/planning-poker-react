import styles from "./menu.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { toggleRole } from "../../../../services/user/user";
import { PlayerRole } from "../../enums/player-role";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { socket } from "../../../../utils/socket-instance/socket-instance";
import { setMenuModal } from "../../reducers/party/partySlice";
import Modal from "../../../../design-system/molecules/modal/modal.molecule";
import Select from "../../../../design-system/atoms/select/select.atom";
import Button from "../../../../design-system/atoms/button/button.atom";
import {
  getDistributions,
  toggleAdmin,
  toggleDistribution,
} from "../../../../services/party/party";
import { Distribution } from "../../interfaces/distribution";

export default function Menu() {
  const { menuModal, partyId, players, distribution } = useSelector(
    (state: RootState) => state.party
  );
  const { role, isOwner } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const [selectedRole, setSelectedRole] = useState<PlayerRole>(role);
  const [selectedAdmin, setSelectedAdmin] = useState<string>("");
  const [selectedDistribution, setSelectedDistribution] = useState<string>("");
  const [distributions, setDistributions] = useState<Distribution[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const dist = await getDistributions();
      setDistributions(dist);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (players) {
      const currentAdmin = players.find((player) => player.isOwner);
      setSelectedAdmin(currentAdmin?.socketId || "");
    }

    if (distribution) {
      setSelectedDistribution(distribution.id);
    }
  }, [players, distribution]);

  const handleChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    const value = target.value as PlayerRole;
    setSelectedRole(value);
  };

  const handleChangeAdmin = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    const value = target.value;
    setSelectedAdmin(value);
  };

  const handleChangeDistribution = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const target = e.target;
    const value = target.value;
    setSelectedDistribution(value);
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

    if (isOwner) {
      await toggleAdmin(partyId, selectedAdmin);
    }

    if (selectedDistribution != distribution?.id) {
      await toggleDistribution(partyId, selectedDistribution);
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
              {isOwner && (
                <>
                  <Select
                    data-testid="admin-select"
                    label="Administrador"
                    name="admin"
                    id="admin"
                    value={selectedAdmin}
                    onChange={handleChangeAdmin}
                  >
                    {players.map(({ socketId, username }) => (
                      <option key={socketId} value={socketId}>
                        {username}
                      </option>
                    ))}
                  </Select>
                  <Select
                    data-testid="distribution-select"
                    label="Distribución"
                    name="distribution"
                    id="distribution"
                    value={selectedDistribution}
                    onChange={handleChangeDistribution}
                  >
                    {distributions.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </>
              )}
              <Button text="Guardar" variant="primary" />
            </form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
