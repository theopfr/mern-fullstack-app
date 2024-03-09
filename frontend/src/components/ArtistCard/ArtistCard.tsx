"use client";

import styles from "./artistCard.module.css"
import { Artist } from "@/app/types";
import { useEffect, useState } from "react";
import ArtistEditor from "@/components/ArtistEditor/ArtistEditor";

interface ArtistCardProps {
  key: number,
  editable: boolean,
  artistData: Artist,
  inGallery: boolean
}


function ArtistCard(props: ArtistCardProps) {

  const [openArtistEditor, setOpenArtistEditor] = useState<boolean>(false);
  const [openEditorDeleteMode, setOpenEditorDeleteMode] = useState<boolean>(false);
  const [artistDataToEdit, setArtistDataToEdit] = useState<Artist | null>(null);

  const closePopup = () => {
    setOpenEditorDeleteMode(false);
    setOpenArtistEditor(false);
  }

  useEffect(() => {
    let newFormatBirthday = new Date(props.artistData.birthday).toISOString().slice(0, 10);
    const editedArtistData = {
      ...props.artistData,
      birthday: newFormatBirthday,
    };
    setArtistDataToEdit(editedArtistData);
  }, []);


  return (
    <main
      className={styles.artistCard}
      id={props.inGallery ? styles.artistSelection : ""}
      onClick={() => {
        // Redirect to artist main page on click on the name
        if (props.inGallery) {
          window.location.href = `/gallery/${props.artistData._id}`;
        }
      }}
    >

      {
        openArtistEditor ? 
          <ArtistEditor
            deleteMode={openEditorDeleteMode}
            isNew={false}
            previousArtistData={artistDataToEdit}
            closeHandler={closePopup}
          />
        : null
      }

      <img
        className={styles.artistImage}
        src="/placeholder-image.svg"
      />

      <div className={styles.cardContent}>

        <div className={styles.cardHeader}>
          <h1 className={styles.cardName}>
            {props.artistData.firstName} {props.artistData.surname}
          </h1>

          <div className={styles.stars}>
            {
              Array.from({ length: props.artistData.stars }, (_, idx) => (
                <img className={styles.starIcon} key={idx} src="/yellow-star-icon.svg"/>
              ))
            }
            {
              Array.from({ length: 5 - props.artistData.stars }, (_, idx) => (
                <img className={styles.starIcon} key={idx} src="/gray-star-icon.svg"/>
              ))
            }
          </div>
          
          { props.editable ?
            <div className={styles.cardSettings}>
              <button className={styles.editButton} onClick={() => {
                setOpenArtistEditor(true);
              }}>
                <img src="/edit-icon.svg"/>
              </button>
              <button className={styles.editButton} onClick={() => {
                setOpenEditorDeleteMode(true);
                setOpenArtistEditor(true);
              }}>
                <img src="/trash-icon.svg"/>
              </button>
            </div>
            : null
          }
          
        </div>

        <div className={styles.cardBody}>
          <table className={styles.infoTable}>
            <tr>
              <th className={styles.tableKey}>Birthday:</th>
              <td className={styles.tableValue}>
                {
                  new Date(props.artistData.birthday).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                }
              </td>
            </tr>
            <tr>
              <th className={styles.tableKey}>Nationality:</th>
              <td className={styles.tableValue}>{props.artistData.nationality}</td>
            </tr>
            <tr>
              <th className={styles.tableKey}>Website:</th>
              <td className={`${styles.tableValue} ${styles.noPadding}`}>
                <button
                  className={styles.tableButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(props.artistData.website, "_blank");
                  }}
                  disabled={!props.artistData.website}
                >
                  {
                    props.artistData.website ? <img className={styles.tableButtonIcon} src="/website-icon.svg"/>
                    : <p>-</p>
                  }
                </button>
              </td>
            </tr>
            <tr>
              <th className={styles.tableKey}>Instagram:</th>
              <td className={`${styles.tableValue} ${styles.noPadding}`}>
                <button
                  className={styles.tableButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`https://www.instagram.com/${props.artistData.instagram}/`, "_blank");
                  }}
                  disabled={!props.artistData.instagram}
                >
                  {
                    props.artistData.instagram ? <img className={styles.tableButtonIcon} src="/instagram-icon.svg"/>
                    : <p>-</p>
                  }
                </button>
              </td>
            </tr>
          </table>

          <div className={styles.biography}>
            <p className={styles.biographyTitle}>Biography:</p>
            <p className={styles.biographText}>
              {
                props.artistData.biography.length === 0 ? "-"
                : props.artistData.biography
              }
            </p>
          </div>

        </div>
      

      </div>
    </main>
  ) 
}

export default ArtistCard;