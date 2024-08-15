import { api } from "../../utils/axios-instance/axios-instance";
import { handleError } from "../../utils/handle-error/handle-error";

export async function createParty(name: string) {
  try {
    const { data } = await api.post("/party", {
      name,
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    handleError("Ocurrió un error creando la partida");
  }
}

export async function getAverage(roomId: string) {
  try {
    const { data } = await api.get(`/party/average/${roomId}`);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    handleError("Ocurrió un error obteniendo el promedio");
  }
}

export async function resetParty(roomId: string) {
  try {
    const { data } = await api.get(`/party/reset/${roomId}`);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    handleError("Ocurrió un error reiniciando la partida");
  }
}

export async function toggleAdmin(roomId: string, userId: string) {
  try {
    const { data } = await api.put("/party/toggle-admin", {
      roomId,
      userId,
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    handleError("Ocurrió un error cambiando el admin");
  }
}
