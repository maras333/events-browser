import styles from './card.module.scss'

export default function Card({id, url, name, handleFavourites, favouriteItems = null}) {

  return (
    <div className={styles.card}>
      <a href={url}>
        <h2>{name} &rarr;</h2>
        <p>To find more info click a link.</p>
      </a>
      <span data-id={id}
        data-url={url}
        data-name={name}
        onClick={handleFavourites}
        className={favouriteItems && favouriteItems.hasOwnProperty(id) ? styles.addCardFavourite : styles.addCard}>{favouriteItems ? 'Add to favourites' : 'Remove from favourites'}
      </span>
    </div>
  )
}