"use client";

import styles from "./page.module.css"

export default function Home() {
  return (
    <main className={styles.landing}>
      <div className={styles.heroSection}>
  
        <div className={styles.callToAction}>
          <h1 className={styles.slogan}>
            Art beyond walls
          </h1>
          <p className={styles.description}>
            Explore timeless pieces anywhere and anytime with <b>eLouvre</b>!
          </p>
          <button className={styles.actionButton} onClick={() => { window.location.href = "/gallery" }}>
            to the gallery ➞
          </button>
        </div>

        <div className={styles.heroImageBox}>
          <img className={styles.heroImage} src="/hero-image.svg"/>
        </div>
      </div>
    </main>
  )
}
