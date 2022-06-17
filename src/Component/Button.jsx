import React from "react";
import { FaBullseye } from "react-icons/fa";
import "./Button.css";

export default function Button({ content, className, disabled = false }) {
  return (
    <div>
      <button className={`btn ${className}`} disabled={disabled}>
        {content}
      </button>
    </div>
  );
}
