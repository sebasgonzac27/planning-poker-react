import styles from './button.module.scss'
import { render, screen } from '@testing-library/react'
import Button from './button.atom'

describe('Button component', () => {
  it('render: should render the button with text', () => {
    render(<Button text='Click me' variant="primary"/>)
    const button = screen.getByText('Click me')
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass(styles.button)
    expect(button).toHaveClass(styles['button--primary'])
  })

  it('render: should render the button with disabled state', () => {
    render(<Button text='Click me' variant="primary" isDisabled={true}/>)
    const button = screen.getByText('Click me')
    expect(button).toBeDisabled()
  })

  it('render: should render the button with custom class', () => {
    render(<Button text='Click me' variant="primary" className="custom-class"/>)
    const button = screen.getByText('Click me')
    expect(button).toHaveClass('custom-class')
  })
})
