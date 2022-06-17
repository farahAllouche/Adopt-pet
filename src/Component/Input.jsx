import React, { useState, useEffect } from "react";
import "./Input.css";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

export default function Input({
  label,
  placeHolder = "",
  type = "text",
  setInput,
  matchpwd = true,
  checkPasswords = null,
  input,
}) {
  const [error, setError] = useState("");
  const [empty, setEmpty] = useState(true);

  function checkEmpty(e) {
    setInput(e.target.value);
    setError("");
    if (e.target.value == "") {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }

  function validateInput(e) {
    checkEmpty(e);
    if (empty == false) {
      if (type == "email") {
        EMAIL_REGEX.test(e.target.value)
          ? setError("")
          : setError("Email adress not valid ! ");
      }
      if (label == "Password") {
        PWD_REGEX.test(e.target.value)
          ? setError("")
          : setError(
              `Password not valid ! \nMust be 8 to 24 characters. \nMust include uppercase and lowercase letters and a number. `
            );
      }
    } else setError("this field is required");
  }
  useEffect(() => {
    if (type == "password") {
      if (checkPasswords) {
        checkPasswords();
        matchpwd ? setError("") : setError("Passwords don't match ! ");
      }
    }
  }, [matchpwd, input]);
  return (
    <div className="input-container">
      <label htmlFor={`label-${label}`} className="input-label">
        {label}
        <span>*</span>
      </label>
      <input
        id={`label-${label}`}
        className="primary-input"
        type={type}
        value={input}
        placeholder={placeHolder}
        required
        autoComplete="false"
        onBlur={validateInput}
        onChange={checkEmpty}
      />
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}
