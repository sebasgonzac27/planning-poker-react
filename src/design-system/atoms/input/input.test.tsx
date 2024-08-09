import { render, screen } from '@testing-library/react'
import Input from './input.atom'

describe('Input component', () => {
  it('render: should render the input with label and errors', () => {
    const errors = ['Error']
    render(<Input label="Test Label" name="testInput" errors={errors}/>)
    const labelElement = screen.getByText('Test Label')
    const inputElement = screen.getByLabelText('Test Label')
    const errorElement = screen.getByText('Error')
    expect(labelElement).toBeInTheDocument()
    expect(inputElement).toBeInTheDocument()
    expect(errorElement).toBeInTheDocument()
  })
})
