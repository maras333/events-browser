import Head from 'next/head'
import styles from './layout.module.scss'
import Navbar from './navbar'
import Footer from './footer'

export const siteTitle = 'Events browser'

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>{siteTitle}</title>
                <meta
                    name="description"
                    content="Search for yours favourite events"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
            </Head>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}