import React, { useState, useEffect } from "react";
import "./adopt.css";
import Card from "../Component/Card";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

import { switchBg } from "../actions";
import Filter from "../Component/Filter";
import axios from "axios";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { setPets, resetFilter } from "../actions";
import _ from "underscore";

export default function Adopt({ theme }) {
  console.log("re render adopt");
  const [error, setError] = useState("");
  const [showFav, setShowFav] = useState(false);
  const appliedFilter = useSelector((state) => state.pets.appliedFilter);
  const filter = useSelector((state) => state.pets.filter);
  let pets = useSelector((state) => state.pets.pets);
  const favPets = useSelector((state) => state.favPets);

  function handleShowFav() {
    setShowFav(!showFav);
  }

  if (showFav) {
    pets = pets.filter((pet) => favPets.includes(pet.id));
  }

  function checkFilter(appliedFilter, petFilter) {
    if (appliedFilter.length == 0) return true;
    return appliedFilter.includes(petFilter);
  }

  function checkAge(age) {
    if (appliedFilter.age.length == 0) return true;
    const ageArray = appliedFilter.age.map((e) => {
      if (e == "Young") return age < 6;
      if (e == "Junior") return age < 36 && age >= 6;
      if (e == "Adult") return age >= 36;
    });
    return ageArray.some((elem) => elem == true);
  }

  function checkBehaviour(pet) {
    if (appliedFilter.behaviour.length == 0) return true;
    const BehavArray = appliedFilter.behaviour.map((e) => {
      if (e == "Cats") return pet.cats == true;
      if (e == "Children") return pet.children == true;
      if (e == "Dogs") return pet.dogs == true;
    });
    return BehavArray.every((elem) => elem == true);
  }

  function applyFilter() {
    const filtredPets = pets.filter((pet) => {
      return (
        checkFilter(appliedFilter.spices, pet.spices) &&
        checkFilter(appliedFilter.gender, pet.gender) &&
        checkFilter(appliedFilter.address, pet.state) &&
        checkAge(pet.ageY * 12 + pet.ageM) &&
        checkBehaviour(pet)
      );
    });
    return filtredPets;
  }
  const dispatch = useDispatch();
  const DispalyPets = filter ? applyFilter() : pets;

  useEffect(() => {
    dispatch(switchBg(false));
    dispatch(resetFilter());
  }, []);

  return (
    <div className="adopt-page">
      <Filter theme={theme} page="adopt" />
      <div className="All-pet">
        <div className="pet-header">
          <h1>{DispalyPets.length} pets found!</h1>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  name="children"
                  checked={showFav}
                  onChange={handleShowFav}
                />
              }
              label="Show only favorite cats"
            />
          </div>
        </div>
        <div className="avaible-pets">
          {DispalyPets.map((pet) => {
            let userFav = false;
            if (favPets.includes(pet.id)) userFav = true;

            return <Card pet={pet} userFav={userFav} />;
          })}
        </div>
      </div>
    </div>
  );
}
