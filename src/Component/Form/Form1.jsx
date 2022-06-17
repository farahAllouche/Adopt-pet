import React, { useEffect, useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import "./Form.css";
import { States, allTowns, getTowns } from "../../wilaya-comune";

const Input = styled("input")({
  display: "none",
});
console.log(allTowns);
export default function Form1({ classname, pet = {} }) {
  const [spices, setSpices] = useState("");
  const [towns, setTowns] = useState(allTowns);
  const [state, setState] = useState("");
  const [img, setImg] = useState("");
  const [count, setCount] = useState(0);
  const [townInp, setTownInp] = useState(allTowns[0]);
  useEffect(() => {
    console.log("state", state);
    const temp = getTowns(state);
    setTowns((prev) => temp);
    console.log(count);
    pet.town && count < 2 ? setTownInp(pet.town) : setTownInp(temp[0]);
    setCount((c) => c + 1);
  }, [state]);

  useEffect(() => {
    pet.spices && setSpices(pet.spices);
    pet.state && setState(pet.state);
    pet.photo &&
      setImg(
        <p>
          <a href={pet.photo}>Click here</a> to go to the pet picture
        </p>
      );
  }, []);
  const handleChange = (event) => {
    setSpices(event.target.value);
  };

  return (
    <div className={`form-pet-container ${classname}`} id="form1">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          size="small"
          fullWidth
          required
          name="name"
          defaultValue={pet.name ? pet.name : ""}
        />

        <FormControl fullWidth size="small" required>
          <InputLabel id="spices">Spices</InputLabel>
          <Select
            labelId="spices"
            label="Spices"
            onChange={handleChange}
            value={spices}
            name="spices"
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
        />
      </Box>

      <Box>
        <FormControl
          variant="outlined"
          size="small"
          className="address-container"
          fullWidth
        >
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
        </FormControl>
      </Box>

      <FormControl
        variant="outlined"
        className="age-container"
        sx={{
          paddingTop: 1,
        }}
      >
        <FormLabel>Age</FormLabel>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1.5,
            pt: 2,
            paddingTop: 0,
          }}
        >
          <TextField
            size="small"
            type="number"
            required
            name="ageY"
            defaultValue={pet ? pet.ageY : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">years</InputAdornment>
              ),
            }}
          />

          <TextField
            size="small"
            type="number"
            required
            name="ageM"
            defaultValue={pet.ageM ? pet.ageM : ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">mounths</InputAdornment>
              ),
            }}
          />
        </Box>
      </FormControl>

      <Box
        sx={{
          paddingTop: 1,
        }}
      >
        <FormControl variant="outlined" fullWidth>
          <TextField
            label="Weight"
            size="small"
            type="number"
            name="weight"
            defaultValue={pet.weight ? pet.weight : ""}
            InputProps={{
              endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
            }}
            inputProps={{
              step: "0.1",
            }}
          />
        </FormControl>
      </Box>
      <FormControl
        sx={{
          paddingTop: 1,
        }}
      >
        <FormLabel id="Gender">Gender</FormLabel>
        <RadioGroup
          aria-labelledby="Gender"
          defaultValue={pet.gender ? pet.gender : "female"}
          name="gender"
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1.5,
            pt: 2,
            paddingTop: 0,
          }}
        >
          <FormControlLabel
            value="female"
            size="small"
            control={<Radio size="small" />}
            label="Female"
          />
          <FormControlLabel
            value="male"
            size="small"
            control={<Radio size="small" />}
            label="Male"
          />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="vaccinated">Vaccinated</FormLabel>
        <RadioGroup
          aria-labelledby="vaccinated"
          name="vaccinated"
          defaultValue={pet.vaccinated == false ? "no" : "yes"}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1.5,
            pt: 2,
            paddingTop: 0,
          }}
        >
          <FormControlLabel
            value="yes"
            size="small"
            control={<Radio size="small" />}
            label="yes"
          />
          <FormControlLabel
            value="no"
            size="small"
            control={<Radio size="small" />}
            label="no"
          />
        </RadioGroup>
      </FormControl>

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
              onChange={(e) => setImg(e.target.files[0].name)}
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
    </div>
  );
}
