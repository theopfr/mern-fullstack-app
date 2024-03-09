"use client";

import styles from "./page.module.css"
import ArtistList from "@/components/ArtistList/ArtistList"

export default function AdminGallery() {
  
  return (
    <main className={styles.adminGallery}>

      <ArtistList title="Admin Gallery" isAdminGallery={true}/>

    </main>
  )
}
