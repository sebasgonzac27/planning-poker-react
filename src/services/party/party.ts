import { api } from "../../utils/axios-instance/axios-instance"
import { handleError } from "../../utils/handle-error/handle-error"

export async function createParty (name: string) {
  try {
    const { data } = await api.post('/party', {
      name
    })
    return data
  } catch (error) {
    handleError('Ocurrió un error creando la partida')
  }
}