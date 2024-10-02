import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./user.css";
import { switchBg } from "../actions";
import { useDispatch } from "react-redux";

export default function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(switchBg(false));
    axios
      .post(
        `https://adopt-pet-be.onrender.com/user`,
        { userId: userId },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((error) => setError(error));
  }, []);
  return (
    <>
      {user && (
        <div className="user-page">
          <div className="container">
            <div className="information">
              <div className="personal-info">
                <h1>Personal information :</h1>
                <p>Name : {user.name || "unkown"}</p>
                <p>Gender : {user.gender || "unkown"}</p>
                <p>Age :{user.age || "unkown"} years old</p>
              </div>
              <div className="contact-info">
                <h1>Contact information :</h1>
                <p>
                  Phone :{" "}
                  {user.phone ? (
                    <a href={`tel:${user.phone}`}>{user.phone} </a>
                  ) : (
                    "unknown"
                  )}
                </p>
                <p>
                  Email :{" "}
                  {user.email ? (
                    <a href={`mailto:${user.email}`}>{user.email} </a>
                  ) : (
                    "unknown"
                  )}
                </p>
              </div>
            </div>
            <div className="image-bio">
              <div className="image-Container">
                <img src={user.photo}></img>
              </div>
              <div className="user-bio">
                <p>{user.bio || ""}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
