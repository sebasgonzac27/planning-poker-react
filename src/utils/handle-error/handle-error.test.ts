import { handleError } from './handle-error'
import { toast } from 'sonner'

describe('Handle Error', () => {
  it('call: should call console.error and toast.error with the provided message', () => {
    const spy1 = jest.spyOn(console, 'error').mockImplementation()
    const spy2 = jest.spyOn(toast, 'error').mockImplementation()

    const testMessage = 'Test error'
    handleError(testMessage)

    expect(spy1).toHaveBeenCalledTimes(1)
    expect(spy2).toHaveBeenCalledTimes(1)
    expect(spy1).toHaveBeenCalledWith(testMessage)
    expect(spy2).toHaveBeenCalledWith(testMessage)
  })
})
