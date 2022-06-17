import React, { useEffect } from "react";
import Typewriter from "typewriter-effect";
import Button from "../Component/Button";
import Input from "../Component/Input";
import DropDownMenu from "../Component/DropDownMenu";
import { Link } from "react-router-dom";
import "./home.css";
import { switchBg } from "../actions";
import { useDispatch } from "react-redux";

export default function Home() {
  var input = document.getElementById("input");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(switchBg(true));
  }, []);

  return (
    <div className="Home-page">
      <h1 className="page-title">
        <div className="title-content">
          Find a new
          <Typewriter
            options={{
              loop: false,
              deleteSpeed: "50",
            }}
            onInit={(input) => {
              input
                .typeString(
                  "<span style='color: #7b1818; white-space: pre;' className = 'append-title'> cat !</span>"
                )
                .pauseFor(1000)
                .deleteAll()
                .typeString(
                  "<span style='color: #7b1818; white-space: pre;'  className = 'append-title'> dog !</span>"
                )
                .pauseFor(1000)
                .deleteAll()
                .typeString(
                  "<span style='color: #7b1818; white-space: pre;'  className = 'append-title'> friend !</span>"
                )
                .pauseFor(4000)
                .start();
            }}
          />
        </div>
      </h1>
      <div className="subtitle">
        You can change your life by adopting, loving and sharing.
      </div>
      <div className="btn-container">
        <Link to="/adopt">
          <Button content="Adopt " className="primary-btn"></Button>
        </Link>
        <Link to="/rehome">
          <Button content="Rehome" className="secondary-btn"></Button>
        </Link>
      </div>
    </div>
  );
}
