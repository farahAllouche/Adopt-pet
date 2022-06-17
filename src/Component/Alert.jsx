import React from "react";
import { BsXSquare } from "react-icons/bs";
import { BiErrorAlt } from "react-icons/bi";
import "./Alert.css";
import { useState, useEffect } from "react";

export default function Alert({ message }) {
  const [alert, setAlert] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      if (alert) {
        console.log("useeffect");
        setAlert(false);
      }
    }, 5000);
  }, [alert]);
  return (
    <div className={alert ? `alert show` : `alert hide`}>
      <div className="alert-content">
        <span className="alert-type-icon">
          <BiErrorAlt />
        </span>
        <span className="alert-msg">{message}</span>
      </div>
      <div className="alert-quit" onClick={() => setAlert(false)}>
        <BsXSquare />
      </div>
    </div>
  );
}
