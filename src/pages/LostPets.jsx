import React, { useEffect } from "react";
import CardLost from "../Component/CardLost";
import axios from "axios";
import moment from "moment";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { switchBg } from "../actions";
import Filter from "../Component/Filter";
import { MdPostAdd } from "react-icons/md";
import "./LostPets.css";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { setPets, resetLostFilter } from "../actions";

export default function LostPets({ theme }) {
  let lostPets = useSelector((state) => state.lostPets.lostpets);
  const filter = useSelector((state) => state.lostPets.filter);
  const appliedFilter = useSelector((state) => state.lostPets.appliedFilter);

  console.log("lostPets", lostPets);
  const dispatch = useDispatch();
  const DispalyLostPets = filter ? applyFilter() : lostPets;

  function checkFilter(appliedFilter, petFilter) {
    if (appliedFilter.length == 0) return true;
    return appliedFilter.includes(petFilter);
  }

  function checkAge(age) {
    if (appliedFilter.age.length == 0) return true;
    const ageArray = appliedFilter.age.map((e) => {
      return e.localeCompare(age, undefined, { sensitivity: "accent" });
    });

    return ageArray.some((elem) => elem == 0);
  }

  /*lostPets = lostPets.map((pet) => {
    return { ...pet, date: moment(pet.date).calendar() };
  });*/
  function applyFilter() {
    const filtredLostPets = lostPets.filter((pet) => {
      return (
        checkFilter(appliedFilter.spices, pet.spices) &&
        checkFilter(appliedFilter.address, pet.state) &&
        checkAge(pet.age)
      );
    });
    return filtredLostPets;
  }

  useEffect(() => {
    dispatch(switchBg(false));
    dispatch(resetLostFilter());
  }, []);

  return (
    <div className="lost-pet-page">
      <Filter theme={theme} page="lost" />

      <div className="lost-pet-wrapper">
        <div className="header">
          <h1>You’ve lost your pet. We’re here to help ! </h1>
          <Link to="/foundPet">
            <Button variant="text" startIcon={<MdPostAdd />}>
              Post a report
            </Button>
          </Link>
        </div>
        <div className="LostPetsContainer">
          {DispalyLostPets.map((pet) => {
            return <CardLost pet={pet} key={pet.id}></CardLost>;
          })}
        </div>
      </div>
    </div>
  );
}
