import MockAdapter from 'axios-mock-adapter'
import { api } from '../../utils/axios-instance/axios-instance'
import { createParty } from './party'
import { handleError } from '../../utils/handle-error/handle-error'

jest.mock('../../utils/handle-error/handle-error')
const mock = new MockAdapter(api)

describe('Party Service', () => {
  describe('createParty', () => {
    it('ok: should create a party', async () => {
      const data = { name: 'Test Party' }
      mock.onPost('/party').reply(200, data)

      const response = await createParty('Test Party')
      expect(response).toEqual(data)
    })

    it('error: should handle errors', async () => {
      mock.onPost('/party').reply(500)

      await createParty('Test Party')

      expect(handleError).toHaveBeenCalledWith('Ocurrió un error creando la partida')
    })
  })
})