import styles from "./artistList.module.css"
import ArtistCard from "@/components/ArtistCard/ArtistCard"
import { Artist } from "@/app/types";
import { useEffect, useState } from "react";
import axios, { AxiosResponse, Error } from "axios";
import ErrorBox from "@/components/ErrorBox/ErrorBox";
import Loading from "@/components/Loading/Loading";
import ArtistEditor from "@/components/ArtistEditor/ArtistEditor";


interface ArtistListProps {
  title: string,
  isAdminGallery: boolean,
}


export default function ArtistList(props: ArtistListProps) {

  const [artistData, setArtistData] = useState<Artist[] | null>(null);
  const [showArtistEditor, setShowArtistEditor] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("newest");
  const [fetchFailed, setFetchFailed] = useState<boolean>(false);
  const [fetchErrorDescription, setFetchErrorDescription] = useState<string>("");

  useEffect(() => {
    loadArtistData();

    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }

  }, []);

  useEffect(() => {
    loadArtistData();
  }, [sortBy]);


  const loadArtistData = () => {
    let endpoint: string = `${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/artists`;
    if (sortBy === "asc") {
      endpoint += "?sort=asc";
    }
    else if (sortBy === "desc") {
      endpoint += "?sort=desc";
    }

    const headers = {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }

    axios.get(endpoint, { headers })
      .then((response: AxiosResponse) => {
        const artistDataResponse = response.data;

        setArtistData(artistDataResponse);
      })
      .catch((error: Error) => {
        setFetchFailed(true);

        if (!error.response?.data.message) {
          setFetchErrorDescription(error.message);
          return;
        }
        if (error.response?.data.message === "authenticationFailed") {
          window.location.href = "/login"
        }
      });
  }

  const closePopup = () => {
    setShowArtistEditor(false);
  }

  if (fetchFailed) {
    return (
      <main className={styles.artistList}>
        <div className={styles.errorBoxWrapper}>
          <ErrorBox errorTitle="Failed to load artist data." errorDescription={fetchErrorDescription}/>
        </div>
      </main>
    );
  }

  if (artistData === null) {
    return (
      <main className={styles.artistList}>
        <Loading />
      </main>
    );
  }

  return (
    <main className={styles.artistList}>

      {
        showArtistEditor ?
          <ArtistEditor
            isNew={true}
            previousArtistData={null}
            closeHandler={closePopup}
            deleteMode={false}
          />
        : null
      }

      <div className={styles.listHeader}>
        <h1 className={styles.galleryTitle}>{props.title}</h1>

        <div className={styles.listSettings}>
          <button className={styles.settingButton} disabled={fetchFailed} onClick={() => {
            if (sortBy === "asc") {
              setSortBy("desc");
            }
            else if (sortBy === "desc") {
              setSortBy("newest");
            }
            else if (sortBy === "newest") {
              setSortBy("asc");
            }
          }}>
            <img src="/sort-icon.svg"/>
            sort {sortBy}
          </button>
          { 
            props.isAdminGallery ?
              <button className={styles.settingButton} disabled={fetchFailed} onClick={() => {
                setShowArtistEditor(true);
              }}>
                <img src="/add-icon.svg"/>
                add
            </button>
            : null
          }
          
        </div>
      
      </div>

      <div className={styles.cardContainer}>
        {
          artistData.map((artist: Artist, idx: number) => {
            return (
              <ArtistCard
                key={idx}
                editable={props.isAdminGallery}
                artistData={artist}
                inGallery={!props.isAdminGallery}
              />
            )
          })
        }
      </div>
    </main>
  )
}
