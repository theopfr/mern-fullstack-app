"use client";

import styles from "./loading.module.css"


function Loading() {

  return (
    <main className={styles.loading}>
      <img className={styles.loadingGif} src="/loading.gif"/>
      <h1 className={styles.loadingText}>Loading...</h1>
    </main>
  ) 
}

export default Loading;