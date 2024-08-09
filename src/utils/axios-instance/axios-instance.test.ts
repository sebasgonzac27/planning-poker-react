import { api } from './axios-instance'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(api)

describe('Axios Instance', () => {
  afterEach(() => {
    mock.reset()
  })

  // Interceptor
  it('interceptor: should return the request', async () => {
    const requestData = { foo: 'bar' }
    mock.onAny().reply(config => {
      expect(config.data).toEqual(JSON.stringify(requestData))
      return [200, config.data]
    })

    const response = await api.post('/endpoint', requestData)
    expect(response.data).toEqual(requestData)
  })

  it('interceptor: should return the response', async () => {
    const responseData = { foo: 'bar' }
    mock.onAny().reply(200, responseData)

    const response = await api.get('/endpoint')
    expect(response.data).toEqual(responseData)
  })
})
