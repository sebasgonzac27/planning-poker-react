import Radio from './radio.atom'
import { render, screen } from '@testing-library/react'

describe('Radio component', () => {
  it('render: should render the radio with label', () => {
    render(<Radio label="Radio" value="radio" name="radio" id="radio" />)
    const label = screen.getByText('Radio')
    const radio = screen.getByLabelText('Radio')
    expect(label).toBeInTheDocument()
    expect(radio).toBeInTheDocument()
  })
})
