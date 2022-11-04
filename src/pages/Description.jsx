import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { switchBg } from "../actions";
import { Button, Box, Slider } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import "./description.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Description() {
  const pets = useSelector((state) => state.pets.pets);
  const { petId } = useParams();
  const [pet, setPet] = useState("");
  const [showPicture, setShowPicture] = useState(false);

  //const pet = pets.find((pet) => pet.id == petId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(switchBg(false));
    axios
      .post(
        `https://cat-dog-adoption.herokuapp.com/pets/`,
        { id: petId },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setPet(res.data);
        console.log(res.data);
      })
      .catch((error) => setError(error.response.data));
  }, []);

  return (
    <>
      {pet && (
        <div className="description-page">
          <div className="pet-intro">
            <div className="pet-hi">
              <h1>Hello, I'm {pet?.name} </h1>
              I'm a{" "}
              {pet?.ageY > 0
                ? pet?.ageY + " year-old"
                : pet?.ageM + " month-old"}{" "}
              {pet?.breed ? pet?.breed : pet?.spices} from {pet?.town},{" "}
              {pet?.state} and I'm looking for a new home. <br></br> Please read
              my profile below to find out more.
            </div>
            <div className="pet-pict" onClick={(e) => setShowPicture(true)}>
              <img src={pet?.photo}></img>
            </div>
          </div>
          <div className="infoNabout-pet">
            <div className="info-pet">
              <h1>{pet?.name}'s Information</h1>
              <div className="row-info">
                <div className="column1">Spices : </div>
                <div className="column2">{pet?.spices}</div>
              </div>
              {pet?.breed && (
                <div className="row-info">
                  <div className="column1">Breed : </div>
                  <div className="column2">{pet?.breed}</div>
                </div>
              )}

              <div className="row-info">
                <div className="column1">Gender : </div>
                <div className="column2">{pet?.gender}</div>
              </div>
              <div className="row-info">
                <div className="column1">Age : </div>
                <div className="column2">
                  {pet?.ageY} years and {pet?.ageM} months
                </div>
              </div>
              <div className="row-info">
                <div className="column1">Location : </div>
                <div className="column2">
                  {pet?.state}, {pet?.town}
                </div>
              </div>
              {pet?.weight && (
                <div className="row-info">
                  <div className="column1">Weight : </div>
                  <div className="column2">{pet?.weight} kg</div>
                </div>
              )}
              <div className="row-info">
                <div className="column1">Vaccinated : </div>
                <div className="column2">{pet?.vaccinated ? "Yes" : "No"}</div>
              </div>
              <div className="row-info">
                <div className="column1">Can live with : </div>
                <div className="column2">
                  {pet?.dogs && "Dogs, "}
                  {pet?.cats && "Cats, "}
                  {pet?.children && "Children, "}
                </div>
              </div>
              <div className="row-info">
                <div className="column1">Health : </div>
                <div className="column2">
                  <Slider
                    aria-label="training"
                    value={pet?.health}
                    valueLabelDisplay="auto"
                    step={2}
                    min={1}
                    max={10}
                    track={true}
                    sx={{ width: 120 }}
                    name="training"
                  />
                </div>
              </div>
              <div className="row-info">
                <div className="column1">Training : </div>
                <div className="column2">
                  <Slider
                    aria-label="training"
                    value={pet?.training}
                    valueLabelDisplay="auto"
                    step={2}
                    min={1}
                    max={10}
                    track={true}
                    sx={{ width: 120 }}
                    name="training"
                  />
                </div>
              </div>
              <div className="row-info">
                <div className="column1">Activity : </div>
                <div className="column2">
                  <Slider
                    aria-label="training"
                    value={pet?.activity}
                    valueLabelDisplay="auto"
                    step={2}
                    min={1}
                    max={10}
                    track={true}
                    sx={{ width: 120 }}
                    name="training"
                  />
                </div>
              </div>
              <div className="row-info">
                <div className="column1">Kindness : </div>
                <div className="column2">
                  <Slider
                    aria-label="training"
                    value={pet?.kindness}
                    valueLabelDisplay="auto"
                    step={2}
                    min={1}
                    max={10}
                    track={true}
                    sx={{ width: 120 }}
                    name="training"
                  />
                </div>
              </div>
            </div>
            <div className="about-pet">
              <h1>About {pet?.name} ! </h1>

              <div>{pet?.about}</div>
              <Link to={`/user/${pet.userId}`}>
                <Button color="secondary" variant="contained">
                  Contact {pet.name} owner
                </Button>
              </Link>
            </div>
          </div>
          {showPicture && (
            <div className="bg-modal photo-box">
              <div className="photo-container">
                <div
                  className="photo-box-quit"
                  onClick={(e) => setShowPicture(false)}
                >
                  <IconButton
                    className="quit-btn"
                    style={{ color: "var(--kata)" }}
                  >
                    <HighlightOffIcon
                      style={{ fontSize: 24, color: "var(--kata)" }}
                    />
                  </IconButton>
                </div>
                <img src={pet?.photo}></img>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
