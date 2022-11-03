import React, { useState, useEffect } from "react";
import Button from "../Component/Button";
import Input from "../Component/Input";
import "./register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../Component/Alert";
import { useDispatch } from "react-redux";
import { signIn } from "../actions";
import { switchBg } from "../actions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigator = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(switchBg(true));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    axios
      .post(
        `https://cat-dog-adoption.herokuapp.com/login`,
        { email, password },
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
          photo: res.data.photo ? res.data.photo : "",
        };
        dispatch(signIn(signInfo));
      })
      .catch((error) => setError(error.response.data.message));
  }
  return (
    <div className="login-page">
      <div className="form-container">
        <h1>Log in</h1>
        <p>
          or create your free account <Link to="/register">here</Link>{" "}
        </p>
        <form autocomplete="off" onSubmit={handleSubmit}>
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
          ></Input>
          <Button content="Sign in" className="colorfull-btn"></Button>
        </form>
      </div>
      {error && <Alert message={error}></Alert>}
    </div>
  );
}
