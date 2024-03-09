"use client";

import axios, { AxiosResponse, AxiosError } from "axios";
import { useState } from "react";
import styles from "./artistEditor.module.css";
import { Rating } from "react-simple-star-rating";
import { Artist } from "@/app/types";
import ErrorBox from "@/components/ErrorBox/ErrorBox";
import FormInput from "@/components/FormInput/FormInput";

interface ArtistEditorProps {
  deleteMode: boolean,
  isNew: boolean,
  previousArtistData: Artist | null,
  closeHandler: () => void
}


function ArtistEditor(props: ArtistEditorProps) {

  const [artistData, setArtistData] = useState({
    firstName: props.isNew ? "" : props.previousArtistData?.firstName || "",
    surname: props.isNew ? "" : props.previousArtistData?.surname || "",
    birthday: props.isNew ? "" : props.previousArtistData?.birthday || "",
    nationality: props.isNew ? "" : props.previousArtistData?.nationality || "",
    website: props.isNew ? "" : props.previousArtistData?.website || "",
    instagram: props.isNew ? "" : props.previousArtistData?.instagram || "",
    biography: props.isNew ? "" : props.previousArtistData?.biography || "",
    stars: props.isNew ? 0 : props.previousArtistData?.stars || 0,
  });

  const [failedInputFields, setFailedInputFields] = useState<string[]>([]);
  const [editErrorMessage, setEditErrorMessage] = useState<string>("");

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setArtistData({ ...artistData, [name]: value });
  };

  const handleFormSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    let errorsFound: boolean = validateArtistData();
    if (errorsFound) {
      return;
    }

    if (props.isNew) {
      postArtist();
    }
    else {
      updateArtist();
    }
  };

  const handleRating = (rating: number) => {
    setArtistData({ ...artistData, ["stars"]: rating });
  }

  const simpleFormInput = (labelText: string, name: string, placeholderText: string, defaultValue: string, inputType: string = "text", required: boolean = true) => {
    let isFailedInput: boolean = failedInputFields.includes(name);
    
    return (
      <div className={styles.columnForm}>
        <label className={styles.editorLabel}>{labelText}:
          { required ? <p color="red">*</p> : null }
          { isFailedInput ? <p className={styles.requiredText}>required</p> : null}
        </label>
        <input
          id={name}
          type={inputType}
          name={name}
          placeholder={placeholderText}
          value={defaultValue}
          onChange={handleInputChange}
          required={required}
        />
      </div>
    );
  }

  const validateArtistData = () => {
    let errorsFound: boolean = false;
    let failedInputIds: string[] = [];

    // Find faulty input fields by checking which
    // of the required fields are empty
    Object.keys(artistData).map((key: string) => {

      let artistValue = artistData[key as keyof typeof artistData];
      if (artistValue === "") {
        let inputField = document.getElementById(key);
        if (inputField && inputField.hasAttribute("required")) {       
          errorsFound = true;
          failedInputIds.push(key);
          
          // Add error styles
          inputField.classList.add("failedInput");
        }
      }
    });

    // Check if no stars were selected
    if (artistData.stars <= 0 || artistData.stars > 5) {
      failedInputIds.push("stars");
      errorsFound = true;
    }

    if (errorsFound) {
      // Remove all error styles after a click anywhere on the screeen
      document.addEventListener("mouseup", function(_event: MouseEvent) {
        const failedInputElements = document.getElementsByClassName("failedInput") as HTMLCollectionOf<HTMLElement>;
        Array.from(failedInputElements).forEach((element) => {
          element.classList.remove("failedInput");
        });
      
        setFailedInputFields([]);
      }, { once: true });
    }

    setFailedInputFields(failedInputIds);

    return errorsFound;
  }

  const onEditSuccess = () => {
    let submitButton = document.getElementById("submitButton") as HTMLButtonElement;
    if (submitButton) {
      submitButton.style.backgroundColor = "var(--success-green)";
      submitButton.style.color = "white";
      submitButton.innerText = "success!";
      submitButton.disabled = true;
    }

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  const postArtist = () => {

    const headers = {
			"Authorization": `Bearer ${localStorage.getItem("token")}`
		}

    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/artists`, [artistData], { headers })
      .then((response: AxiosResponse) => {
        onEditSuccess();
      })
      .catch((error: AxiosError) => {
        setEditErrorMessage(error.message);
      });
  }

  const updateArtist = () => {
    // Update/PUT request expect artist data given an id
    let artistUpdate: { [key: string]: Artist } = {};
    artistUpdate[props.previousArtistData?._id] = artistData;

    const headers = {
			"Authorization": `Bearer ${localStorage.getItem("token")}`
		}

    axios.put(`${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/artists`, artistUpdate, { headers })
      .then((response: AxiosResponse) => {
        onEditSuccess();
      })
      .catch((error: AxiosError) => {
        if (error.hasOwnProperty("response")) {
          setEditErrorMessage(error.response.data.message);
        }
        else {
          setEditErrorMessage(error.message);
        }
      });
  }

  const deleteArtist = () => {
    const headers = {
			"Authorization": `Bearer ${localStorage.getItem("token")}`
		}

    // Delete request expect artist data given an id
    axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/artists`, {
      data: [props.previousArtistData?._id],
      headers: headers
    })
      .then((response: AxiosResponse) => {
        let deleteButton = document.getElementById("deleteButton") as HTMLButtonElement;
        if (deleteButton) {
          deleteButton.innerText = "deleted!";
          deleteButton.disabled = true;
        }
        onEditSuccess();
      })
      .catch((error: AxiosError) => {
        console.log(error)
        if (error.hasOwnProperty("response")) {
          setEditErrorMessage(error.response.data.message);
        }
        else {
          setEditErrorMessage(error.message);
        }
      });
  }

  if (props.deleteMode) {
    return (
      <main className={styles.artistEditor}>
        <div className={styles.errorBoxWrapper}>
          <p className={styles.deleteText}>
            Are you sure you want to delete the artist <b>{`${artistData?.firstName} ${artistData?.surname}`}</b>?
          </p>
          <button className={styles.backButton} onClick={() => props.closeHandler()}>
            back
          </button>
          <button className={styles.deleteButton} id="deleteButton" onClick={() => deleteArtist()}>
            delete
          </button>
        </div>
      </main>
    );
  }

  if (editErrorMessage.length > 0) {
    return (
      <main className={styles.artistEditor}>
        <div className={styles.errorBoxWrapper}>
          <ErrorBox errorTitle={"Failed to add or edit artist!"} errorDescription={editErrorMessage} />
          <button className={styles.backButton} onClick={() => props.closeHandler()}>
            back
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.artistEditor}>
			<div className={styles.editorPopup}>

        <div className={styles.editorHeader}>
          <h1 className={styles.artistName}>
            {
              props.isNew ?
                "New Artist"
              :
                `${props.previousArtistData?.firstName} ${props.previousArtistData?.surname}`
            }  
            
          </h1>
          <button className={styles.closePopupButton} onClick={() => props.closeHandler()}>
            <img src="/close-icon.svg" />
          </button>
        </div>

        <div className={styles.editorBox}>

        <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
          <div className={styles.formGrid}>
            <FormInput
              labelText="First Name"
              name="firstName"
              placeholderText="Enter first name."
              value={artistData.firstName}
              inputType="text"
              isMissing={failedInputFields.includes("firstName")}
              handleInputChange={handleInputChange}
              required={true}
            />

            <FormInput
              labelText="Surname"
              name="surname"
              placeholderText="Enter surname."
              value={artistData.surname}
              inputType="text"
              isMissing={failedInputFields.includes("surname")}
              handleInputChange={handleInputChange}
              required={true}
            />

            <FormInput
              labelText="Birthday"
              name="birthday"
              placeholderText="Enter birthday."
              value={artistData.birthday}
              inputType="date"
              isMissing={failedInputFields.includes("birthday")}
              handleInputChange={handleInputChange}
              required={true}
            />

            <FormInput
              labelText="Nationality"
              name="nationality"
              placeholderText="Enter nationality."
              value={artistData.nationality}
              inputType="text"
              isMissing={failedInputFields.includes("nationality")}
              handleInputChange={handleInputChange}
              required={true}
            />

            <FormInput
              labelText="Website"
              name="website"
              placeholderText="Enter link."
              value={artistData.website}
              inputType="text"
              isMissing={failedInputFields.includes("website")}
              handleInputChange={handleInputChange}
              required={false}
            />

            <FormInput
              labelText="Instagram"
              name="instagram"
              placeholderText="Enter link."
              value={artistData.instagram}
              inputType="text"
              isMissing={failedInputFields.includes("instagram")}
              handleInputChange={handleInputChange}
              required={false}
            />

            <div className={styles.spanForm}>
              <label style={{"font-weight": "bold"}}>
                Biography:
                <textarea
                  className={styles.editorTextArea}
                  maxLength={200}
                  name="biography"
                  placeholder="Add biography. (max. 200)"
                  value={artistData.biography}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className={styles.spanForm}>
                <div className={styles.starRatingBox}>
                  <p
                    className={styles.starRatingText}
                    style={
                      failedInputFields.includes("stars") ? {"color": "var(--main-red)"} : {}
                    }  
                  >Rate this artist!</p>
                  <Rating
                    onClick={handleRating}
                    fillColor="#FFE01A"
                    emptyColor={"var(--mid-gray)"}
                    size="30px"
                    initialValue={artistData.stars}
                    style={{"margin": "auto"}}
                    transition={true}
                    allowHover={false}
                    required
                  />
                </div>              
            </div>
          </div>

          <button className={styles.submitButton} id="submitButton" type="submit">
            {
              props.isNew ? 
                <>
                  <img src="/add-icon.svg"/>
                  add artist
                </>
              :
                <>
                  <img src="/save-icon.svg"/>
                  save artist
                </>
            }
            
          </button>
        </form>


        </div>

			</div>
    </main>
  ) 
}

export default ArtistEditor;