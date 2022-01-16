import Link from 'next/link'
import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'
import useSWR from 'swr'
import { fetcher } from '../helpers'
import geohash from 'ngeohash'
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [positioned, setPositioned] = useState(false)
  const [geoPoint, setGeoPoint] = useState('')
  const { data, error } = useSWR(positioned ? `https://app.ticketmaster.com/discovery/v2/events.json?apikey=HN1QS3e5ZB3VZcJEK3xGpoK5HQmtdWUK&geoPoint=${geoPoint}&radius=50&unit=km&size=10` : null, fetcher);
  useEffect(() => {
    if('geolocation' in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition((position) => {
        setGeoPoint(geohash.encode(position.coords.latitude, position.coords.longitude));
      });    
      setPositioned(true)
    } else {
      /* geolocation IS NOT available */
      setPositioned(true)
    }  
  }, []);  
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
                    data?._embedded?.events.map(evt => {
                      return (
                        <a key={evt.id} href={evt.url} className={styles.card}>
                          <h2>{evt.name} &rarr;</h2>
                          <p>To find more info click a link.</p>
                        </a>
                      )
                    }) ?? <div>There is no events</div>
                  }
                </div>
          }
        </main>
      </div>
    </Layout>
  )
}
