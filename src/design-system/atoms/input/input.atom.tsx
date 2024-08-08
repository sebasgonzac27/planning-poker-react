import styles from './input.module.scss'
import { ComponentProps } from 'react'

interface Props extends ComponentProps<'input'> {
    label: string;
    errors?: string[];
    name: string;
}

/**
 * Description: Make an input component with label and errors
 * @date 2024-05-09
 * @author Juan Sebastian Gonzalez Camacho
 * @param {ComponentProps<'input'>} props
 * @function
 */
export default function Input ({ label, errors, name, ...props }: Props) {
  return (
        <div className={styles['input-container']}>
            <label htmlFor={name} className={styles['input-container__label']}>
                {label}
            </label>
            <input className={styles['input-container__input']} name={name} id={name} autoComplete="off" {...props} />
            <div className={styles['input-container__error-container']}>
                {errors && errors.map((error, _index) => <span className={styles['input-container__error']} key={_index}>{error}</span>)}
            </div>
        </div>
  )
}
