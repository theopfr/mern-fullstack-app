"use client";

import styles from "./page.module.css"
import { useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import FormInput from "@/components/FormInput/FormInput";

function RegisterBox() {

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [failedInputFields, setFailedInputFields] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const validateInputForm = () => {
    let errorsFound: boolean = false;
    let failedInputIds: string[] = [];

    // Find faulty input fields by checking which
    // of the required fields are empty
    Object.keys(registerData).map((key: string) => {

      let artistValue = registerData[key as keyof typeof registerData];
      if (artistValue === "") {
        let inputField = document.getElementById(key);
        if (inputField) {       
          errorsFound = true;
          failedInputIds.push(key);
          
          // Add error styles
          inputField.classList.add("failedInput");
        }
      }
    });

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

  const handleFormSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    let errorsFound: boolean = validateInputForm();
    if (!errorsFound) {
      sendRegisterRequest();
    }
  };

  const sendRegisterRequest = () => {
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/register`, registerData)
      .then((response: AxiosResponse) => {
        let submitButton = document.getElementById("submitButton") as HTMLButtonElement;
        if (submitButton) {
          submitButton.style.backgroundColor = "var(--success-green)";
          submitButton.style.color = "white";
          submitButton.innerText = "success!";
          submitButton.disabled = true;
        }

        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      })
      .catch((error: AxiosError) => {

        console.log(error.response.data.message)

        if (!error.response?.data.message) {
          setErrorMessage(error.message);
        }
        else if (error.response.data.message === "invalidUserName") {
          setErrorMessage("Please enter a valid user name!");
        }
        else if (error.response.data.message === "invalidEmail") {
          setErrorMessage("Please enter a valid email!");
        }
        else if (error.response.data.message === "emailAlreadyExists") {
          setErrorMessage("This email is already in use!");
        }
        else if (error.response.data.message === "passwordTooWeak") {
          setErrorMessage("Password too weak! (at least: 8 characters, one upper case, one number)");
        }
        else if (error.response.data.message === "passwordTooWeak") {
          setErrorMessage("Password too weak! (at least: 8 characters, one upper case, one number)");
        }
        else if (error.response.data.message === "passwordTooLong") {
          setErrorMessage("Password too long! (at max. 60 characters)");
        }
        else if (error.response.data.message === "registrationFailed") {
          setErrorMessage("Unexpected registration error!");
        }

        document.addEventListener("mouseup", function(_event: MouseEvent) {
          setErrorMessage("");
        }, { once: true });

      });
  }

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  return (
    <main className={styles.registerBox}>
      <h1 className={styles.registerTitle}>Registration</h1>

      <p className={styles.registerLink}>Already have an account? <a href="/login">Log in</a></p>

      <form className={styles.registerForm} onSubmit={handleFormSubmit} noValidate>
        <FormInput
          labelText="Name"
          name="name"
          placeholderText="Enter your name."
          value={registerData.name}
          inputType="text"
          isMissing={failedInputFields.includes("name")}
          handleInputChange={handleInputChange}
          required={true}
        />

        <FormInput
          labelText="Email"
          name="email"
          placeholderText="Enter your email."
          value={registerData.email}
          inputType="text"
          isMissing={failedInputFields.includes("email")}
          handleInputChange={handleInputChange}
          required={true}
        />

        <FormInput
          labelText="Password"
          name="password"
          placeholderText="Enter your password."
          value={registerData.password}
          inputType="password"
          isMissing={failedInputFields.includes("password")}
          handleInputChange={handleInputChange}
          required={true}
        />

        <button className={styles.submitButton} id="submitButton" type="submit">
          <img className={styles.registerIcon} src="/login-icon.svg"/>
          register
        </button>

      </form>

      {
        errorMessage.length > 0 ?
          <p className={styles.errorMessage}>{errorMessage}</p>
        : null
      }

    </main>
  );
}

export default RegisterBox;
