import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import Card from '../components/card'
import styles from './favourites.module.scss'

export default function Favourites() {
  const [items, setItems] = useState({});
  useEffect(function () {
    setItems(JSON.parse(localStorage.getItem("favourites")))
  }, []);

  const handleRemoveFromFavourites = (e) => {
    const id = e.target.dataset.id;
    let favourites = JSON.parse(localStorage.getItem("favourites"))
    delete favourites[id]
    localStorage.setItem('favourites', JSON.stringify({ ...favourites }))
    setItems(JSON.parse(localStorage.getItem("favourites")))
  }

  const elements = Object.keys(items); 
  return (
    <Layout>
      <div className={styles.container}>
        <h2>My favourite events:</h2>
        {
          elements.length ? elements.map(el => {
            return (
              <Card
                isMainPage={false}
                key={items[el].id}
                id={items[el].id}
                url={items[el].url}
                name={items[el].name}
                handleFavourites={handleRemoveFromFavourites}
              />
            )
          }) : <div>There is no favourite events!</div>
        }
        <Link href="/">
          <a className={styles.link}>Go to HomePage</a>
        </Link>
      </div>
    </Layout>
  )
}
