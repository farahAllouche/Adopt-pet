import React, { useState, useRef } from "react";
import {
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  FormLabel,
  Autocomplete,
  TextField,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Input,
  Button,
  Chip,
} from "@mui/material";
import "./Filter.css";
import { States, allTowns, getTowns } from "../wilaya-comune";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MyAutocomplete from "./AutoComplte";
import { useDispatch, useSelector } from "react-redux";
import {
  resetFilter,
  filterPets,
  filterLostPets,
  resetLostFilter,
} from "../actions";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    color: personName.indexOf(name) === -1 ? "var(--black)" : "var(--teemo)",
  };
}

export default function Filter({ theme, page }) {
  const formRef = useRef();
  const [spices, setSpices] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [behaviour, setBehaviour] = useState("");

  const dispatch = useDispatch();

  console.log("re render filter");

  const handleFilter = (e) => {
    e.preventDefault();
    if (page == "adopt") {
      dispatch(resetFilter());
      const newFilter = {
        spices: spices ? spices : [],
        gender: gender ? gender : [],
        age: age ? age.map((a) => a.split(" ")[0]) : [],
        address: address ? address : [],
        behaviour: behaviour ? behaviour : [],
      };
      console.log(newFilter);
      dispatch(filterPets(newFilter));
    } else {
      dispatch(resetLostFilter());
      const newFilter = {
        spices: spices ? spices : [],
        age: age ? age.map((a) => a.split(" ")[0]) : [],
        address: address ? address : [],
      };
      dispatch(filterLostPets(newFilter));
    }
  };

  return (
    <div className="filter-page">
      <form className="filter-form" ref={formRef} onSubmit={handleFilter}>
        <div className="title">
          <h3>Find Your Best Match !</h3>
        </div>
        <MyAutocomplete
          options={["cat", "dog"]}
          title="Spices"
          setInput={setSpices}
        />
        {page == "adopt" && (
          <MyAutocomplete
            options={["male", "female"]}
            title="Gender"
            setInput={setGender}
          />
        )}

        <MyAutocomplete
          options={[
            "Young (< 6 months)",
            "Junior (7 months - 2 years)",
            "Adult ( > 3 years )",
          ]}
          title="Age"
          setInput={setAge}
        />
        <MyAutocomplete
          options={States}
          title="Address"
          setInput={setAddress}
        />
        {page == "adopt" && (
          <MyAutocomplete
            options={["Children", "Cats", "Dogs"]}
            title="Can live wih"
            setInput={setBehaviour}
          />
        )}

        <div className="button-wrapper">
          <Button color="secondary" variant="contained" type="submit">
            save
          </Button>
        </div>
      </form>
    </div>
  );
}
