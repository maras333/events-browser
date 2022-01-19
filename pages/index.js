import Layout from '../components/layout'
import styles from '../styles/Home.module.scss'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import useSWR from 'swr'
import { fetcher, getClassifications } from '../helpers'
import geohash from 'ngeohash'
import React, { useState, useEffect } from 'react'
import Multiselect from 'multiselect-react-dropdown'
import Card from '../components/card'

export default function Home() {
  const router = useRouter()
  const [favouriteItems, setFavouriteItems] = useState({});
  let page = router.query.page || 0
  const [positioned, setPositioned] = useState(false)
  const [geoPoint, setGeoPoint] = useState('')
  const [classifications, setClassifications] = useState([])
  const [selectedValues, setSelectedValues] = useState([])
  const { data, error } = useSWR(positioned ? `https://app.ticketmaster.com/discovery/v2/events.json?apikey=HN1QS3e5ZB3VZcJEK3xGpoK5HQmtdWUK&page=${page ?? 0}&geoPoint=${geoPoint}&classificationId=${selectedValues}&radius=200&unit=km&size=10` : null, fetcher);
  
  useEffect(() => {
    setFavouriteItems(JSON.parse(localStorage.getItem("favourites")));
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

  const onSelectHandler = (selectedList, selectedItem) => {
    setSelectedValues(selectedList.map(item => item.id))
  }

  const onRemoveHandler = (selectedList, removedItem) => {
    setSelectedValues(selectedList.map(item => item.id))
  }

  const handleAddToFavourites = (e) => {
    let favourites = JSON.parse(localStorage.getItem("favourites"))
    const id = e.target.dataset.id;
    const name = e.target.dataset.name;
    const url = e.target.dataset.url;
    localStorage.setItem('favourites', JSON.stringify({...favourites, [id]: {id, name, url}}))
    setFavouriteItems(JSON.parse(localStorage.getItem("favourites")));
  }
  return (
    <Layout>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.options}>
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
            <Link href="/favourites">
              <a className={styles.link}>Go to my favourites events</a>
            </Link>

          </div>
          {
            error ? <div>Failed to load:(</div> :
              !data ? <div>loading...</div> :
                <div className={styles.grid}>
                  {
                    data?._embedded?.events.map(evt => {
                      return (
                        <Card
                          id={evt.id}
                          url={evt.url}
                          name={evt.name}
                          handleFavourites={handleAddToFavourites}
                          favouriteItems={favouriteItems}
                        />
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
