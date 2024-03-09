"use client";

import styles from "./formInput.module.css"


interface FormInputProps {
    labelText: string,
    name: string,
    placeholderText: string,
    value: string,
    inputType: string,
    isMissing: boolean,
    required: boolean,
    handleInputChange: (e: { target: { name: any; value: any; }; }) => void
}


export default function FormInput(props: FormInputProps) {    
    return (
      <div className={styles.columnForm}>
        <label className={styles.editorLabel}>{props.labelText}:
          { props.required ? <p className={styles.requiredSmybol}>*</p> : null }
          { props.isMissing ? <p className={styles.requiredText}>required</p> : null}
        </label>
        <input
          id={props.name}
          type={props.inputType}
          name={props.name}
          placeholder={props.placeholderText}
          value={props.value}
          onChange={props.handleInputChange}
          required={props.required}
        />
      </div>
    );
  }