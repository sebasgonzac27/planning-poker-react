import styles from "./new-player.module.scss";
import usePlayerForm from "../../hooks/use-player-form/usePlayerForm";
import { PlayerRole } from "../../enums/player-role";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Modal from "../../../../design-system/molecules/modal/modal.molecule";
import Input from "../../../../design-system/atoms/input/input.atom";
import RadioGroup from "../../../../design-system/molecules/radio-group/radio-group.molecule";
import Radio from "../../../../design-system/atoms/radio/radio.atom";
import Button from "../../../../design-system/atoms/button/button.atom";

export default function NewPlayer() {
  const { userLoggedIn } = useSelector((state: RootState) => state.party);
  const { name, errors, handleNameChange, handleRoleChange, handleSubmit } =
    usePlayerForm();
  return (
    <>
      {!userLoggedIn && (
        <Modal>
          <Modal.Body className={styles.modal__body}>
            <form className={styles.modal__form} onSubmit={handleSubmit}>
              <Input
                label="Tu nombre"
                type="text"
                placeholder="Ingresa tu nombre"
                name="name"
                onChange={handleNameChange}
                errors={errors}
              />
              <RadioGroup>
                <Radio
                  label="Jugador"
                  name="role-player"
                  id="radio-player"
                  value={PlayerRole.Player}
                  defaultChecked
                  onChange={handleRoleChange}
                />
                <Radio
                  label="Espectador"
                  name="role-player"
                  id="radio-viewer"
                  value={PlayerRole.Viewer}
                  onChange={handleRoleChange}
                />
              </RadioGroup>
              <Button
                text="Continuar"
                variant="primary"
                disabled={errors.length > 0 || !name}
              />
            </form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
