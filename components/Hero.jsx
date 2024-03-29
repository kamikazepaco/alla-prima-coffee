import React from 'react'
import styles from '../styles/Hero.module.css'
import EmblaCarousel from './EmblaCarousel'

const Hero = () => {
  return (
    <header className={styles.hero}>
        <div className={styles.test}></div>
      <div className={styles.hero_container}>
        <div className={styles.hero_text}>
          <h2> Carefully Curated and Expertly Roasted</h2>
        </div>
        <button className={styles.btn}>Where to Buy</button>
      </div>
    </header>
  )
}

export default Hero