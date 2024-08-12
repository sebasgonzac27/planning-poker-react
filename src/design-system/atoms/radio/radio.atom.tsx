import styles from './radio.module.scss'
import { ComponentProps } from 'react'

interface Props extends ComponentProps<'input'> {
    label: string,
    name: string,
    value: string,
    id: string
}

export default function Radio ({ label, value, name, id, ...props }: Props) {
  return (
        <div className={styles['radio-container']}>
            <label className={styles['radio-container__label']} htmlFor={id}>
                {label}
            </label>
            <input className={styles['radio-container__input']} type="radio" value={value} name={name} id={id} {...props} />
        </div>
  )
}
