import Link from 'next/link'
import Layout from '../components/layout';
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
          <Link href="/">
            <a>Welcome to events browser!</a>
          </Link>
          </h1>
          <div className={styles.grid}>
            <a href="https://www.marekczyz.xyz" className={styles.card}>
              <h2>Event nr 1 &rarr;</h2>
              <p>Find in-depth information about Event nr 1.</p>
            </a>

            <a href="https://www.marekczyz.xyz" className={styles.card}>
              <h2>Event nr 2 &rarr;</h2>
              <p>Learn about Event nr 2 in an interactive way</p>
            </a>

            <a href="https://www.marekczyz.xyz" className={styles.card}>
              <h2>Event nr 3 &rarr;</h2>
              <p>Discover informations about Event nr 3</p>
            </a>

            <a href="https://www.marekczyz.xyz" className={styles.card}>
              <h2>Event nr 4 &rarr;</h2>
              <p>Meet together on Event nr 4</p>
            </a>
          </div>
        </main>
      </div>
    </Layout>
  )
}
