import styles from './card.module.scss'

export default function Card({isMainPage, id, url, name, handleFavourites, favouriteItems}) {

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
        className={isMainPage && Object.keys(favouriteItems).length && favouriteItems.hasOwnProperty(id) ? styles.addCardFavourite : styles.addCard}>{isMainPage ? 'Add to favourites' : 'Remove from favourites'}
      </span>
    </div>
  )
}