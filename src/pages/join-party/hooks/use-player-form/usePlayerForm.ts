import React, { useState } from "react";
import { PlayerRole } from "../../enums/player-role";
import { validateInput } from "../../../../utils/validate-input/validate-input";
import { handleError } from "../../../../utils/handle-error/handle-error";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setUserLoggedIn } from "../../reducers/party/partySlice";
import {
  setUsername,
  setRole as setRoleReducer,
} from "../../reducers/user/userSlice";
import { socket } from "../../../../utils/socket-instance/socket-instance";

export default function usePlayerForm() {
  const dispatch = useDispatch();
  const { partyId } = useSelector((state: RootState) => state.party);

  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<PlayerRole>(PlayerRole.Player);
  const [errors, setErrors] = useState<string[]>([]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setErrors(validateInput(e.target.value));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value as PlayerRole);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errors.length > 0) {
      handleError("Ingrese un nombre válido.");
      return;
    }

    socket.emit("join-party", { partyId, name, role });
    dispatch(setUsername(name));
    dispatch(setRoleReducer(role as PlayerRole));
    dispatch(setUserLoggedIn(true));
  };

  return {
    name,
    role,
    errors,
    handleNameChange,
    handleRoleChange,
    handleSubmit,
  };
}
