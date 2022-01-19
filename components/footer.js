import styles from './footer.module.scss'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <a
                href="https://www.marekczyz.xyz"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by <strong>Siskins Solutions</strong>
            </a>
        </footer>
    )
}