import { renderHook, act } from '@testing-library/react'
import useWindowDimensions from './useWindowDimensions'

describe('useWindowDimensions', () => {
  beforeEach(() => {
    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 })
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 768 })
  })

  it('should return initial window dimensions', () => {
    const { result } = renderHook(() => useWindowDimensions())
    expect(result.current).toEqual({ width: 1024, height: 768 })
  })

  it('should update dimensions on window resize', () => {
    const { result } = renderHook(() => useWindowDimensions())

    act(() => {
      // Change window dimensions
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 800 })
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 600 })
      window.dispatchEvent(new Event('resize'))
    })

    expect(result.current).toEqual({ width: 800, height: 600 })
  })
})
