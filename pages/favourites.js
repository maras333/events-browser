import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
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
  console.log(elements)
  return (
    <Layout>
    <div className={styles.container}>
      <h2>My favourite events:</h2>
      {
        elements.length ? elements.map(el => {
          return (
            <div className={styles.card} key={items[el].id}>
              <a href={items[el].url}>
                <h2>{items[el].name} &rarr;</h2>
                <p>To find more info click a link.</p>
              </a>
              <span data-id={items[el].id}
                data-url={items[el].url}
                data-name={items[el].name}
                onClick={handleRemoveFromFavourites}
                className={styles.addCard}>Remove from favourites
                            </span>
            </div>
          )
        }) : <div>There is no favourite events!</div>
      }
    </div>
    </Layout>
  )
}
