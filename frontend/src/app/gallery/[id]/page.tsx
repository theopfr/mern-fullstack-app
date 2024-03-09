"use client";

import { useEffect, useState } from "react";
import ArtistCard from "@/components/ArtistCard/ArtistCard"
import { Artist } from "@/app/types";
import axios, { AxiosResponse, AxiosError } from "axios";
import ErrorBox from "@/components/ErrorBox/ErrorBox";
import Loading from "@/components/Loading/Loading";
import styles from "./page.module.css"


export default function Artist(params: { params: { id: string }}) {

	const [artistData, setArtistData] = useState<Artist | undefined>();
	const [fetchFailed, setFetchFailed] = useState<boolean>(false);
	const [fetchErrorDescription, setFetchErrorDescription] = useState<string>("");


	useEffect(() => {
		let endpoint: string = `${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/artists/${params.params.id}`;

		const headers = {
			"Authorization": `Bearer ${localStorage.getItem("token")}`
		}

		axios.get(endpoint, { headers })
			.then((response: AxiosResponse) => {
				setArtistData(response.data);
			})
			.catch((error: AxiosError) => {
				setFetchFailed(true);
				setFetchErrorDescription(error.message);
			});
	}, []);


	if (fetchFailed) {
		return (
			<main>
				<div className={styles.errorBoxWrapper}>
					<ErrorBox errorTitle="Failed to load artist data." errorDescription={fetchErrorDescription}/>
				</div>
			</main>
		);
	}

	if (!artistData) {
		return (
			<main className={styles.singleArtist}>
				<Loading />
			</main>
		)
	}

  return (
    <main className={styles.singleArtist}>
    
			<ArtistCard
				key={0}
				editable={false}
				artistData={artistData}
				inGallery={false}
			/>

			<div className={styles.singleArtistDisplay}>
				<h1 className={styles.teaser}>More coming soon...</h1>
			</div>
			

    </main>
  )
}
