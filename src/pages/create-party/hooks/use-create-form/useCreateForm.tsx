import { validateInput } from "../../../../utils/validate-input/validate-input.ts";
import React, { useState } from "react";
import { createParty } from "../../../../services/party/party.ts";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../../../utils/handle-error/handle-error.ts";

export function useCreateForm() {
  const [partyName, setPartyName] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPartyName(e.target.value);
    const errors = validateInput(e.target.value);
    if (errors) {
      setErrors(errors);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errors.length > 0) {
      handleError("Ingrese un nombre válido.");
      return;
    }

    const { id } = await createParty(partyName);
    if (id) {
      navigate(`/join-party/${id}`);
    }
  };

  return {
    partyName,
    errors,
    handleChange,
    handleSubmit,
  };
}
