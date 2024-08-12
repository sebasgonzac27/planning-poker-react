import { render, screen } from '@testing-library/react'
import Card from './card.atom'
import styles from './card.module.scss'

describe('Card component', () => {
  it('render: should render the card with all props', () => {
    render(<Card variant='small' fill className='custom-class'>Click me</Card>)
    const card = screen.getByText('Click me')
    expect(card).toHaveClass(styles.card)
    expect(card).toHaveClass(styles['card--small'])
    expect(card).toHaveClass(styles['card--filled'])
    expect(card).toHaveClass('custom-class')
  })

  it('render: should render the card without all props', () => {
    render(<Card>Click me</Card>)
    const card = screen.getByText('Click me')
    expect(card).toBeInTheDocument()
  })
})
