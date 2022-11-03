import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  InputAdornment,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  IconButton,
  Box,
  Autocomplete,
  TextareaAutosize,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useParams } from "react-router-dom";

import { BsFillCameraFill } from "react-icons/bs";
import { styled } from "@mui/material/styles";
import CardLost from "../Component/CardLost";
import { States, allTowns, getTowns } from "../wilaya-comune";
import MyAutocomplete from "../Component/AutoComplte";
import { switchBg } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../FireBase/indexx";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addLostPet } from "../actions";
import { Link, useNavigate } from "react-router-dom";

import "./AddLost.css";

const Input = styled("input")({
  display: "none",
});

export default function AddLost({ pet = {} }) {
  const [spices, setSpices] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [towns, setTowns] = useState(allTowns);
  const [state, setState] = useState("");
  const [photo, setPhoto] = useState("");
  const [details, setDetails] = useState("");
  const [count, setCount] = useState(0);
  const [townInp, setTownInp] = useState(allTowns[0]);
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    console.log("state", state);
    const temp = getTowns(state);
    setTowns((prev) => temp);
    console.log(count);
    pet.town && count < 2 ? setTownInp(pet.town) : setTownInp(temp[0]);
    setCount((c) => c + 1);
  }, [state]);

  useEffect(() => {
    dispatch(switchBg(false));
  }, []);

  function handleUpload(pet) {
    const storageRef = ref(storage, `/images/${new Date().getTime()}`);

    const uploadTask = uploadBytesResumable(storageRef, pet.photo);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploaded = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(uploaded);
      },
      (error) => {
        setError("Upload photo failed !");
        toDataBase({ ...pet, photo: "" });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          toDataBase({ ...pet, photo: url });
        });
      }
    );
  }

  const toDataBase = (lostPet) => {
    axios
      .post(`https://cat-dog-adoption.herokuapp.com/lostPet/add`, lostPet, {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        dispatch(addLostPet(res.data));
        navigator("/lostPets", { replace: true });
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const town = e.target.town.value;
    const photo = e.target.photo.files[0];

    const lostPet = {
      spices,
      breed,
      state,
      town,
      age,
      photo,
      details,
    };

    console.log(lostPet);
    photo ? handleUpload(lostPet) : toDataBase(lostPet);
  };

  return (
    <div className="add-lost-pet-page">
      <h1>Report a found Pet </h1>
      <form className="form-lost-pet" onSubmit={handleSubmit}>
        <Box
          fullWidth
          sx={{
            display: "flex",
            gap: "70px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              flex: 1,
            }}
          >
            <label>Pet's informations : </label>

            <FormControl fullWidth size="small" required>
              <InputLabel id="spices">Spices</InputLabel>
              <Select
                labelId="spices"
                label="Spices"
                value={spices}
                name="spices"
                onChange={(e) => setSpices(e.target.value)}
              >
                <MenuItem value="cat">Cat</MenuItem>
                <MenuItem value="dog">Dog</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Breed"
              variant="outlined"
              size="small"
              name="breed"
              fullWidth
              defaultValue={pet.breed ? pet.breed : ""}
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />

            <FormControl fullWidth size="small" required>
              <InputLabel id="age">Age</InputLabel>
              <Select
                labelId="age"
                label="Age"
                value={age}
                name="age"
                onChange={(e) => setAge(e.target.value)}
              >
                <MenuItem value="young">{"Young (< 6 months)"}</MenuItem>
                <MenuItem value="junior">
                  {"Junior (7 months - 2 years)"}
                </MenuItem>
                <MenuItem value="adult">{"Adult ( > 3 years )"}</MenuItem>
              </Select>
            </FormControl>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                paddingTop: 1,
              }}
            >
              <FormLabel>Address</FormLabel>
              <Autocomplete
                defaultValue={pet.state && pet.state}
                inputValue={state}
                onInputChange={(event, newInputValue) => {
                  setState(newInputValue);
                }}
                options={States}
                size="small"
                renderInput={(params) => (
                  <TextField {...params} label="State" required name="state" />
                )}
              />
              <Autocomplete
                options={towns}
                size="small"
                value={townInp}
                onChange={(event, newInputValue) => {
                  setTownInp(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Town" name="town" />
                )}
              />
            </Box>

            <FormControl
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <FormLabel>Photo</FormLabel>
              <label htmlFor="icon-button-file">
                <Box>
                  <FormLabel sx={{ wordWrap: "break-word" }}>{img}</FormLabel>
                  <Input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    name="photo"
                    onChange={(e) => setImg(e.target.value)}
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <BsFillCameraFill />
                  </IconButton>
                </Box>
              </label>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              width: "500px",
            }}
          >
            <label>Details</label>
            <FormControl fullWidth>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={19}
                required
                name="about"
                defaultValue={pet ? pet.about : ""}
                onChange={(e) => setDetails(e.target.value)}
              />
            </FormControl>
          </Box>
        </Box>
        <div className="save-btn">
          <LoadingButton
            loading={loading}
            variant="contained"
            color="secondary"
            type="submit"
          >
            Save
          </LoadingButton>
        </div>
      </form>
    </div>
  );
}
