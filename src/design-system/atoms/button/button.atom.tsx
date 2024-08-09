import styles from './button.module.scss'
import { ComponentProps } from 'react'

interface Props extends ComponentProps<'button'> {
    text: string
    variant: 'primary' | 'secondary' | 'tertiary'
    isDisabled?: boolean
    className?: string
}

export default function Button ({ text, variant, isDisabled = false, className, ...props }: Props) {
  return (
        <button className={`${styles.button} ${styles[`button--${variant}`]} ${className}`} disabled={isDisabled} {...props}>
            {text}
        </button>
  )
}
