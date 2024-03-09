"use client";

import styles from "./page.module.css"
import ArtistList from "@/components/ArtistList/ArtistList"


export default function Gallery() {

  return (
    <main className={styles.gallery}>
      <ArtistList title="Gallery" isAdminGallery={false}/>
    </main>
  )
}
