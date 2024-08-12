import RadioGroup from './radio-group.molecule'
import { render, screen } from '@testing-library/react'

describe('Radio Group Component', () => {
  it('should render children', () => {
    render(
      <RadioGroup>
        <div>Child 1</div>
        <div>Child 2</div>
      </RadioGroup>
    )

    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
  })
})
