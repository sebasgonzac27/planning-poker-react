import styles from './avatar.module.scss'
import { ComponentProps } from 'react'

interface Props extends ComponentProps<'span'> {
    variant: 'small' | 'large'
    initials: string
    className?: string
}

export default function Avatar ({ variant, initials, className, ...props }: Props) {
  return (
        <span className={`${styles.avatar} ${styles[`avatar--${variant}`]} ${className}`} {...props}>{initials.toUpperCase()}</span>
  )
}
