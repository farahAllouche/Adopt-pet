import React, { useState, useEffect } from "react";
import Button from "../Component/Button";
import Input from "../Component/Input";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../Component/Alert";
import { useDispatch } from "react-redux";
import { signIn } from "../actions";
import { switchBg } from "../actions";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [matchpwd, setMatchpwd] = useState(true);
  const [error, setError] = useState("");

  const navigator = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(switchBg(true));
  }, []);

  function checkPasswords() {
    if (password && Cpassword && password.localeCompare(Cpassword) != 0)
      setMatchpwd(false);
    else setMatchpwd(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    axios
      .post(
        `https://cat-dog-adoption.herokuapp.com/register`,
        { email, password, name },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        e.target.reset();
        navigator("/", { replace: true });
        const signInfo = {
          userName: res.data.name,
          id: res.data.userId,
          photo: "",
        };
        dispatch(signIn(signInfo));
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  return (
    <div className="register-page">
      <div className="form-container">
        <h1>Create account</h1>
        <form autocomplete="off" onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            setInput={setName}
            input={name}
          ></Input>
          <Input
            label="Email adress"
            type="email"
            setInput={setEmail}
            input={email}
          ></Input>
          <Input
            label="Password"
            type="password"
            input={password}
            setInput={setPassword}
            checkPasswords={checkPasswords}
          ></Input>
          <Input
            label="Confirm password"
            type="password"
            input={Cpassword}
            setInput={setCpassword}
            matchpwd={matchpwd}
            checkPasswords={checkPasswords}
          ></Input>
          <Button content="Sign up" className="colorfull-btn"></Button>
        </form>
      </div>
      {error && <Alert message={error}></Alert>}
    </div>
  );
}
