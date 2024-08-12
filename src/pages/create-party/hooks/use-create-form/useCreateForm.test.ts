import { renderHook, act } from '@testing-library/react'
import { useCreateForm } from './useCreateForm'
import React from 'react'
import { validateInput } from '../../../../utils/validate-input/validate-input'
import { createParty } from '../../../../services/party/party'
import { handleError } from '../../../../utils/handle-error/handle-error'

const navigateMock = jest.fn()
const validateInputMock = validateInput as jest.Mock
const createPartyMock = createParty as jest.Mock

jest.mock('react-router-dom', () => ({
  useNavigate: () => {
    return navigateMock
  }
}))

jest.mock('../../../../utils/handle-error/handle-error')

jest.mock('../../../../utils/validate-input/validate-input')

jest.mock('../../../../services/party/party', () => ({
  createParty: jest.fn()
}))

describe('useCreateForm', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  // Initial state

  it('initial state: should return the initial state', () => {
    const { result } = renderHook(() => useCreateForm())
    expect(result.current.partyName).toBe('')
    expect(result.current.errors).toEqual([])
  })

  // Handle Change

  it('handle change: should set the party name when is correct', () => {
    const { result } = renderHook(() => useCreateForm())
    const event = { target: { value: 'test' } } as React.ChangeEvent<HTMLInputElement>
    validateInputMock.mockReturnValue([])
    act(() => {
      result.current.handleChange(event)
    })
    expect(validateInputMock).toHaveBeenCalledTimes(1)
    expect(validateInputMock).toHaveBeenCalledWith('test')
    expect(result.current.partyName).toBe('test')
    expect(result.current.errors).toEqual([])
  })

  it('handle change: should set the party name and errors when is incorrect', () => {
    const { result } = renderHook(() => useCreateForm())
    const event = { target: { value: 'test' } } as React.ChangeEvent<HTMLInputElement>
    validateInputMock.mockReturnValue(['error'])
    act(() => {
      result.current.handleChange(event)
    })
    expect(validateInputMock).toHaveBeenCalledTimes(1)
    expect(validateInputMock).toHaveBeenCalledWith('test')
    expect(result.current.partyName).toBe('test')
    expect(result.current.errors).toEqual(['error'])
  })

  // Handle Submit

  it('handle submit: should call toast error when there are errors', async () => {
    const { result } = renderHook(() => useCreateForm())

    validateInputMock.mockReturnValue(['error'])

    act(() => {
      result.current.handleChange({ target: { value: 'test' } } as React.ChangeEvent<HTMLInputElement>)
    })

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(handleError).toHaveBeenCalledTimes(1)
    expect(createPartyMock).not.toHaveBeenCalled()
    expect(navigateMock).not.toHaveBeenCalled()
  })

  it('handle submit: should call create party and router push when there are no errors', async () => {
    const { result } = renderHook(() => useCreateForm())

    validateInputMock.mockReturnValue([])

    const expectedId = 1
    createPartyMock.mockResolvedValue({ id: expectedId })

    act(() => {
      result.current.handleChange({ target: { value: 'test' } } as React.ChangeEvent<HTMLInputElement>)
    })

    await act(async () => {
      await result.current.handleSubmit({ preventDefault: jest.fn() } as unknown as React.FormEvent<HTMLFormElement>)
    })

    expect(handleError).not.toHaveBeenCalled()
    expect(createPartyMock).toHaveBeenCalledTimes(1)
    expect(createPartyMock).toHaveBeenCalledWith('test')
    expect(navigateMock).toHaveBeenCalledTimes(1)
    expect(navigateMock).toHaveBeenCalledWith(`/join-party/${expectedId}`)
  })
})
