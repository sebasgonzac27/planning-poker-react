import styles from './radio-group.module.scss'
import { ComponentProps } from 'react'

interface Props extends ComponentProps<'div'> { }

export default function RadioGroup ({ children }: Props) {
  return (
        <div className={styles.group}>
            {children}
        </div>
  )
}
