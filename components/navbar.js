import styles from './navbar.module.scss'
import Link from 'next/link'

export default function Navbar() {
    return (
        <h1 className={styles.title}>
            <Link href="/">
                <a>Welcome to events browser!</a>
            </Link>
        </h1>
    )
}