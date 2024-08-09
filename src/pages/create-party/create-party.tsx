import Button from "../../design-system/atoms/button/button.atom";
import Input from "../../design-system/atoms/input/input.atom";
import styles from "./create-party.module.scss";
import { useCreateForm } from "./hooks/use-create-form/useCreateForm";

export default function CreateParty() {
  const { partyName, errors, handleChange, handleSubmit } = useCreateForm();

  return (
    <main className={styles["create-container"]}>
      <header className={styles["create-container__header"]}>
        <div className={styles["create-container__banner"]}>
          <img
            src="/img/poker.svg"
            alt="Pocker Pragma"
            width={60}
            height={60}
          />
          <h1 className={styles["create-container__title"]}>Crear Partida</h1>
        </div>
      </header>
      <section className={styles["create-container__content"]}>
        <form
          data-testid="form"
          className={styles["create-container__form"]}
          onSubmit={handleSubmit}
        >
          <Input
            label="Nombra la partida"
            name="name"
            type="text"
            placeholder="Ingresa un nombre"
            value={partyName}
            required
            onChange={handleChange}
            errors={errors}
          />
          <Button
            text="Crear partida"
            variant="primary"
            isDisabled={errors.length > 0 || partyName === ""}
          />
        </form>
      </section>
    </main>
  );
}
