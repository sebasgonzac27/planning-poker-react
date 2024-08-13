import styles from './card.module.scss'
import { ComponentProps, ReactNode } from 'react'

interface Props extends ComponentProps<'button'> {
    children?: ReactNode,
    variant?: 'small' | 'large',
    fill?: boolean,
}

export default function Card ({ children, variant = 'small', fill, className, ...props }: Props) {
  return (
        <button className={ `${styles.card} ${styles[`card--${variant}`]} ${fill ? styles['card--filled'] : ''} ${className}`}{...props}>
            {children}
        </button>
  )
}
