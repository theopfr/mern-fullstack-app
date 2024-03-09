"use client";

import styles from "./page.module.css"
import { useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import FormInput from "@/components/FormInput/FormInput";

function LoginBox() {

  const [loginData, setLoginData] = useState({
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
    Object.keys(loginData).map((key: string) => {

      let artistValue = loginData[key as keyof typeof loginData];
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
      sendLoginRequest();
    }
  };

  const sendLoginRequest = () => {
    axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}/login`, loginData)
      .then((response: AxiosResponse) => {
        let submitButton = document.getElementById("submitButton") as HTMLButtonElement;
        if (submitButton) {
          submitButton.style.backgroundColor = "var(--success-green)";
          submitButton.style.color = "white";
          submitButton.innerText = "success!";
          submitButton.disabled = true;
        }

        localStorage.setItem("token", response.data.accessToken);

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      })
      .catch((error: AxiosError) => {
        if (!error.response?.data.message) {
          setErrorMessage(error.message);
        }
        else if (error.response.data.message === "emailOrPasswordIncorrect") {
          setErrorMessage("Email or password incorrect!");
        }
        
        document.addEventListener("mouseup", function(_event: MouseEvent) {
          setErrorMessage("");
        }, { once: true });

      });
  }

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  return (
    <main className={styles.loginBox}>
      <h1 className={styles.loginTitle}>Login</h1>

      <p className={styles.registerLink}>Don&apos;t have an account yet? <a href="/register">Register now</a></p>

      <form className={styles.loginForm} onSubmit={handleFormSubmit} noValidate>
        <FormInput
          labelText="Email"
          name="email"
          placeholderText="Enter your email."
          value={loginData.email}
          inputType="text"
          isMissing={failedInputFields.includes("email")}
          handleInputChange={handleInputChange}
          required={true}
        />

        <FormInput
          labelText="Password"
          name="password"
          placeholderText="Enter you password."
          value={loginData.password}
          inputType="password"
          isMissing={failedInputFields.includes("password")}
          handleInputChange={handleInputChange}
          required={true}
        />

        <button className={styles.submitButton} id="submitButton" type="submit">
          <img className={styles.loginIcon} src="/login-icon.svg"/>
          login
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

export default LoginBox;
