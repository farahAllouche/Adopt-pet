import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { BiMap } from "react-icons/bi";
import { BsGenderMale, BsGenderFemale, BsHeart } from "react-icons/bs";
import { FaDog, FaCat } from "react-icons/fa";
import { GiAges } from "react-icons/gi";
import { IconContext } from "react-icons";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { setFavPets } from "../actions";
import axios from "axios";
import { Link } from "react-router-dom";
import { setPets } from "../actions";
import DraggableDialog from "./DraggableDialog";

export default function MediaCard({ pet, userFav = false }) {
  const favPets = useSelector((state) => state.favPets);
  const id = useSelector((state) => state.isLogged.id);
  const userPet = id.localeCompare(pet.userId);
  const pets = useSelector((state) => state.pets.pets);

  console.log(userPet);

  console.log(pet);
  const dispatch = useDispatch();

  console.log("userFav", userFav);

  function handleDelete() {
    axios
      .delete(`https://adopt-pet-be.onrender.com/pets/delete/${pet.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const newPets = pets.filter((p) => p.id != pet.id);
        console.log(newPets);
        dispatch(setPets(newPets));
      })
      .catch((error) => console.log(error));
  }

  function handleFav() {
    const newFavs = userFav
      ? favPets.filter((f) => f.localeCompare(pet.id) != 0)
      : [...favPets, pet.id];

    axios
      .patch(
        `https://adopt-pet-be.onrender.com/userInterest`,
        { fav: newFavs },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(setFavPets(newFavs));
      })
      .catch((error) => console.log(error));
  }
  return (
    <Card className="card">
      <CardMedia
        component="img"
        height="200"
        image={pet.photo}
        alt="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="card-header"
        >
          <div className="cap">
            {pet.name}{" "}
            {pet.gender == "female" ? (
              <BsGenderFemale size="20" />
            ) : (
              <BsGenderMale size="20" />
            )}
          </div>
          <div>
            <IconButton
              aria-label="add to favorites"
              className="fav"
              style={{ color: "var(--kata)" }}
              onClick={handleFav}
            >
              {userFav ? (
                <FavoriteIcon style={{ fontSize: 24, color: "var(--kata)" }} />
              ) : (
                <FavoriteBorderIcon
                  style={{ fontSize: 24, color: "var(--kata)" }}
                />
              )}
            </IconButton>
          </div>
        </Typography>
        <IconContext.Provider value={{ color: "var(--teemo)" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            className="info-field"
          >
            {pet.spices == "cat" ? <FaCat size="20" /> : <FaDog size="20" />}{" "}
            {pet.breed || "unkown"}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="info-field"
          >
            <GiAges size="20" /> {pet.ageY} years and {pet.ageM} months
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            className="info-field"
          >
            <BiMap size="20" /> {pet.state}, {pet.town}
          </Typography>
        </IconContext.Provider>
      </CardContent>
      <CardActions>
        <Link to={`/description/${pet.id}`}>
          <Button size="small" color="secondary">
            Learn More
          </Button>
        </Link>
      </CardActions>

      {userPet == 0 && (
        <div>
          <Link to={`/update/${pet.id}`}>
            <div className="edit-but">
              <IconButton
                aria-label="edit"
                className="edit"
                style={{ color: "var(--kata)" }}
              >
                <EditIcon style={{ fontSize: 20, color: "var(--kata)" }} />
              </IconButton>
            </div>
          </Link>
          <DraggableDialog petId={pet.id} />
        </div>
      )}
    </Card>
  );
}
