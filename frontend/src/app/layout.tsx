"use client";


import { Inter } from "next/font/google"
import styles from "./page.module.css"
import "./globals.css"
import { useEffect, useState } from "react";


const inter = Inter({ subsets: ["latin"] })


export default function RootLayout({ children, }: { children: React.ReactNode }) {

  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, []);


  return (
    <html lang="en">
      <head>
        <title>eLouvre</title>
        <meta name="Online art gallery." content="Online art gallery."/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"></link>
      </head>
      <body className={inter.className}>

        <nav className={styles.navbar}>
          <div className={styles.navigationContent}>

            <button className={styles.homeButton} onClick={() => { window.location.href = "/" }}>
              <img className={styles.logo} src="/elouvre-logo.svg"/>
              <h1 className={styles.title}>eLouvre</h1>
            </button>
            
            <div className={styles.navigationButtonGroup}>
              <button className={styles.navigationButton} onClick={() => { window.location.href = "/gallery" }}>
                gallery
              </button>
              <button className={styles.navigationButton} onClick={() => { window.location.href = "/admin" }}>
                admin
              </button>

              <div className={styles.navigationDelimiter}></div>

              {
                loggedIn ?
                  <button className={`${styles.navigationButton} ${styles.authButton}`} onClick={() => {
                    localStorage.removeItem("token")
                    window.location.href = "/";  
                  }}>
                    log out
                  </button>
                :
                <>
                  <button className={`${styles.navigationButton} ${styles.authButton}`} onClick={() => { window.location.href = "/login" }}>
                    log in
                  </button>
                  <button className={`${styles.navigationButton} ${styles.authButton}`} onClick={() => { window.location.href = "/register" }}>
                    register
                  </button>
                </>
              }
              
            </div>

          </div>
        </nav>

        <div className={styles.contentContainer}>
          {children}
        </div>
        
      </body>
    </html>
  )
}
