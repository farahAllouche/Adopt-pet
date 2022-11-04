import React, { useEffect, useState } from "react";
import { BsHeart, BsSearch } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { FaAlignJustify } from "react-icons/fa";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../actions";
import "./Header.css";
import Button from "@mui/material/Button";

export default function Header({ setSideBar, sideBar, style }) {
  const [error, setError] = useState("");

  const navigator = useNavigate();
  const isLogged = useSelector((state) => state.isLogged.isLogged);
  const dispatch = useDispatch();

  function handleLogout() {
    axios
      .delete(`https://glittery-queijadas-ca1b16.netlify.app/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("logout", res.data);
        dispatch(signOut());
        //navigator("login", { replace: true });
      })
      .catch((error) => setError(error.response));
  }

  const profile = isLogged ? (
    <>
      <Link to="/">
        <span onClick={handleLogout}>
          Log out
          <FiLogOut />
        </span>
      </Link>
    </>
  ) : (
    <>
      <Link to="/login">
        <span>
          Log in
          <FiLogIn />
        </span>
      </Link>
    </>
  );

  function showSideBar() {
    console.log(sideBar);
    setSideBar(1);
    console.log(sideBar);
  }

  return (
    <IconContext.Provider value={{ size: "20px" }}>
      <header className={style}>
        <nav className="main-nav">
          <div className="logo-img">
            <Link to="/">
              <img src="../../images/logo.png"></img>
            </Link>
          </div>
          <ul className="nav-links">
            <li className="profil-link">{profile}</li>

            {isLogged && sideBar != 1 && (
              <li className="hamburger" onClick={showSideBar}>
                <FaAlignJustify />
              </li>
            )}
          </ul>
        </nav>
      </header>
    </IconContext.Provider>
  );
}
