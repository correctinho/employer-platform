import { ReactNode, ButtonHTMLAttributes } from 'react'
import styles from './styles.module.css'

import { Loader } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    children: ReactNode
}

export function ButtonComp({ loading, children, ...rest }: ButtonProps) {
    return (
        <button
            className={styles.button}
            disabled={loading}
            {...rest}
        >
            {loading ? (
                <Loader className={styles.loader} />
            ) : (
                <a className={styles.buttonText}>
                    {children}
                </a>
            )}
        </button>
    )
}