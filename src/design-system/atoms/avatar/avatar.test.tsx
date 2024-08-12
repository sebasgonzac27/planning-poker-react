import styles from './avatar.module.scss'
import Avatar from './avatar.atom'
import { render, screen } from '@testing-library/react'

describe('Avatar component', () => {
  it('render: should render the avatar with all props', () => {
    render(<Avatar variant="small" initials="Ab" className="custom-class"/>)
    const avatar = screen.getByText('AB')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveClass(styles.avatar)
    expect(avatar).toHaveClass(styles['avatar--small'])
    expect(avatar).toHaveClass('custom-class')
  })

  it('render: should render the avatar without custom class', () => {
    render(<Avatar variant="small" initials="Ab"/>)
    const avatar = screen.getByText('AB')
    expect(avatar).toBeInTheDocument()
  })
})
