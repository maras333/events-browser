import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'
import Router, { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcher, getClassifications } from '../helpers'
import geohash from 'ngeohash'
import React, { useState, useEffect } from 'react'
import Multiselect from 'multiselect-react-dropdown'

export default function Home() {
  const router = useRouter()
  let page = router.query.page || 0
  const [positioned, setPositioned] = useState(false)
  const [geoPoint, setGeoPoint] = useState('')
  const [classifications, setClassifications] = useState([])
  const [selectedValues, setSelectedValues] = useState([])
  const { data, error } = useSWR(positioned ? `https://app.ticketmaster.com/discovery/v2/events.json?apikey=HN1QS3e5ZB3VZcJEK3xGpoK5HQmtdWUK&page=${page ?? 0}&geoPoint=${geoPoint}&classificationId=${selectedValues}&radius=200&unit=km&size=10` : null, fetcher);

  useEffect(() => {
    setClassifications(getClassifications());
    if ('geolocation' in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition((position) => {
        setGeoPoint(geohash.encode(position.coords.latitude, position.coords.longitude));
      });
    } else {
      /* geolocation IS NOT available */
      setGeoPoint(geohash.encode(52.229, 21.012)) // Warsaw location by default
    }
    setPositioned(true)
  }, []);

  useEffect(function () {
    localStorage.setItem('name', 'item1')
  }, []);

  const onSelectHandler = (selectedList, selectedItem) => {
    setSelectedValues(selectedList.map(item => item.id))
  }

  const onRemoveHandler = (selectedList, removedItem) => {
    setSelectedValues(selectedList.map(item => item.id))
  }

  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <Multiselect
            placeholder="Click to search for event"
            options={classifications} // Options to display in the dropdown
            onSelect={onSelectHandler} // Function will trigger on select event
            onRemove={onRemoveHandler} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
            style={{
              searchBox: {
                width: '350px'
              }
            }}
          />
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
        <div className={styles.paginationButtons}>
          <button className={styles.button} onClick={() => {
            let currentPage = parseInt(page) - 1 >= 0 ? parseInt(page) - 1 : 0;
            Router.push(`/?page=${currentPage}`)
          }}>Previous</button>
          <button className={styles.button} onClick={() => {
            let currentPage = parseInt(page) + 1;
            Router.push(`/?page=${currentPage}`)
          }}>Next</button>
        </div>
      </div>
    </Layout>
  )
}
