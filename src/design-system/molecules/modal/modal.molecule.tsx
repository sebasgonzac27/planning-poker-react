import { createPortal } from 'react-dom'
import styles from './modal.module.scss'
import { Children, ComponentProps, ReactElement, ReactNode, cloneElement, useEffect, useState } from 'react'

export default function Modal ({ children } : { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [mounted])

  return mounted
    ? createPortal(
        <div className={styles.modal}>
            <dialog className={styles.modal__content}>
                {Children.map(children, (child) => cloneElement(child as ReactElement<ReactNode>))}
            </dialog>
        </div>,
        document.getElementById('modal') as HTMLElement
    )
    : null
}

function Header ({ children, className }: ComponentProps<'div'>) {
  return (
        <header className={className}>
            {children}
        </header>
  )
}

function Body ({ children, className }: ComponentProps<'div'>) {
  return (
        <div className={className}>
            {children}
        </div>
  )
}

Modal.Header = Header
Modal.Body = Body
