import { api } from "../../utils/axios-instance/axios-instance";
import { handleError } from "../../utils/handle-error/handle-error";

export async function vote({
  vote,
  roomId,
  userId,
}: {
  vote: string;
  roomId: string;
  userId: string;
}) {
  try {
    const { data } = await api.post("/party/vote", {
      vote,
      roomId,
      userId,
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    handleError("Ocurrió un error al votar");
  }
}

export async function toggleRole({
  role,
  roomId,
  userId,
}: {
  role: string;
  roomId: string;
  userId: string;
}) {
  try {
    const { data } = await api.put("/party/toggle-role", {
      role,
      roomId,
      userId,
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    handleError("Ocurrió un error al cambiar de rol");
  }
}
