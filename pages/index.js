import Link from 'next/link'
import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'
import useSWR from 'swr'
import { fetcher } from '../helpers'

export default function Home() {
  const { data, error } = useSWR('https://app.ticketmaster.com/discovery/v2/events.json?apikey=HN1QS3e5ZB3VZcJEK3xGpoK5HQmtdWUK&geoPoint=u3k41hk9&radius=50&unit=km&size=5', fetcher);
  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            <Link href="/">
              <a>Welcome to events browser!</a>
            </Link>
          </h1>
          {
            error ? <div>Failed to load:(</div> :
              !data ? <div>loading...</div> :
                <div className={styles.grid}>
                  {
                    data._embedded.events.map(evt => {
                      return (
                        <a href={evt.url} className={styles.card}>
                          <h2>{evt.name} &rarr;</h2>
                          <p>To find more info click a link.</p>
                        </a>
                      )
                    })
                  }
                </div>
          }
        </main>
      </div>
    </Layout>
  )
}
