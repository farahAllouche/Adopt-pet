import React from "react";
import "./SideBar.css";
import { BsXSquare } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BadgeAvatars from "./BadgeAvatars";
export default function SideBar({ setSideBar, sideBar }) {
  const userName = useSelector((state) => state.isLogged.userName);
  const photo = useSelector((state) => state.isLogged.photo);

  function hideSideBare() {
    setSideBar(3);
  }

  console.log("re render sidebar");
  return (
    <div className={sideBar == 1 ? "bg-modal" : ""}>
      <IconContext.Provider value={{ color: "#ede7e0", size: "25px" }}>
        <div
          className={
            sideBar == 0
              ? "side-bar hidden"
              : sideBar == 1
              ? "side-bar show"
              : "side-bar hide"
          }
        >
          <div className="quit-icon">
            <span onClick={hideSideBare}>
              <BsXSquare style={{ color: "#ede7e0", size: "40" }}></BsXSquare>
            </span>
          </div>
          <Link to="/account">
            <div className="profile-info">
              <BadgeAvatars photo={photo} />
              <h3>{userName}</h3>
            </div>
          </Link>
          <div className="links-container">
            <ul>
              <Link to="/adopt">
                <li>Adopt new pet</li>
              </Link>
              <Link to="/rehome">
                <li>Rehome your pet</li>
              </Link>
              <Link to="/lostPets">
                <li>Lost and found</li>
              </Link>
            </ul>
          </div>
          <div className="img-dog">
            <img src="./dog.png"></img>
          </div>
        </div>
      </IconContext.Provider>
    </div>
  );
}
