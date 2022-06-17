import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import "./DropDownMenu.css";

export default function DropDownMenu({ text, children }) {
  const [selected, setSelected] = useState(null);
  let toggleIndex;
  const subMenu = document.querySelector(".subMenu");

  function toggleDropDown() {
    if (!toggleIndex) {
      subMenu.style.height = `${subMenu.scrollHeight}px`;
      toggleIndex = true;
      return;
    }

    subMenu.style.height = 0;
    toggleIndex = false;
  }
  function handleClick(e) {
    setSelected(e.target.value);
    subMenu.style.height = `0`;
  }
  console.log(selected);

  return (
    <div className="drop-down-menu">
      <button className="btn btn-menu" onClick={toggleDropDown} type="button">
        <span>{text} </span>
        <span className="arrow">
          <RiArrowDropDownLine size="20px" />
        </span>
      </button>
      <div className="subMenu">
        <ul className="options">
          {children.map((child, i) => (
            <li value={i} onClick={handleClick}>
              {child}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
