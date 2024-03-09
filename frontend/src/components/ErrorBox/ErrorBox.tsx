"use client";

import styles from "./errorBox.module.css"


interface ErrorBoxProps {
    errorTitle: string,
    errorDescription: string
}


function ErrorBox(props: ErrorBoxProps) {

  return (
    <main className={styles.errorBox}>
      <img className={styles.alertImage} src="/alert-image.svg"/>
			<h1 className={styles.errorTitle}>{props.errorTitle}</h1>
			<p className={styles.errorDescription}><b>Error description:</b><br/>{props.errorDescription}</p>
    </main>
  ) 
}

export default ErrorBox;