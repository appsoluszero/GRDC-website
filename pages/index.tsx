import Head from 'next/head'
import Image from 'next/image'
import GRCHeader from '../modules/header/GRCHeader'
import styles from '../styles/Home.module.scss'


export default function Home() {
  return (
    <div>
      <div className={styles.motto_container}>
        {new Array(100).fill(0).map((_, i) => <div key={i}>
          <h1>{i + 1}. Game Research and Development Club</h1>
          <h2>Join us and discover your passion together!</h2>
        </div>)}
      </div>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
