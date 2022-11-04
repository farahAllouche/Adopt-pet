import React, { useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

import { BsFillCameraFill } from "react-icons/bs";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../FireBase/indexx";
import Alert from "../Component/Alert";
import { signIn } from "../actions";
import axios from "axios";
import {
  Button,
  TextField,
  FormControl,
  InputAdornment,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextareaAutosize,
  IconButton,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import "./account.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { switchBg } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../Component/Card";
import "./adopt.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Account() {
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);
  const [error, setError] = React.useState("");

  const [loading, setLoading] = useState(false);

  const navigator = useNavigate();

  let pets = useSelector((state) => state.pets.pets);
  const id = useSelector((state) => state.isLogged.id);
  pets = pets.filter((pet) => pet.userId == id);
  const favPets = useSelector((state) => state.favPets);

  console.log(pets);

  useEffect(() => {
    dispatch(switchBg(false));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    axios
      .get(`https://cat-dog-adoption.herokuapp.com/account`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setName(res.data.name);
        setAge(res.data.age || "");
        setEmail(res.data.email);
        setPhone(res.data.phone || "");
        setBio(res.data.bio || "");
        setGender(res.data.gender || "");
        setPhoto(res.data.photo || "");
      })
      .catch((error) => setError(error.response.data.message));
  }, []);

  const Input = styled("input")({
    display: "none",
  });

  useEffect(() => {
    if (value == 0) {
      if (img) {
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log(reader.result);
          document.querySelector(
            "#image-container"
          ).style.backgroundImage = `url(${reader.result})`;
        };
        reader.readAsDataURL(img);
      } else {
        photo
          ? (document.querySelector(
              "#image-container"
            ).style.backgroundImage = `url(${photo})`)
          : (document.querySelector(
              "#image-container"
            ).style.backgroundImage = `none`);
      }
    }
  }, [img, photo, value]);

  function handleUpload(account) {
    const storageRef = ref(storage, `/images/${new Date().getTime()}`);
    console.log(account.photo);

    const uploadTask = uploadBytesResumable(storageRef, account.photo);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploaded = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        setError("Upload photo failed !");
        delete account["photo"];
        toDataBase({ ...account, photo: "" });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("url", url);

          toDataBase({ ...account, photo: url });
        });
      }
    );
  }

  function toDataBase(account) {
    console.log(account);
    account.photo || delete account["photo"];
    console.log(account);
    axios
      .patch(`https://cat-dog-adoption.herokuapp.com/account`, account, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("res.data");
        setLoading(false);
        const signInfo = {
          userName: name,
          photo: account.photo ? account.photo : photo,
          id: id,
        };
        dispatch(signIn(signInfo));
        navigator("/", { replace: true });
      })
      .catch((error) => setError(error.response.data.message));
  }

  function handleSubmitForm1(e) {
    e.preventDefault();
    setLoading(true);
    const accountDetails = { name, gender, phone, age, bio, photo: img };
    img ? handleUpload(accountDetails) : toDataBase(accountDetails);
  }

  function handleSubmitForm2(e) {
    e.preventDefault();
    setLoading(true);
    if (newPassword.localeCompare(confPassword) == 0) {
      const accountDetails = newPassword
        ? { email, password: newPassword, currentPwd: oldPassword }
        : { email, currentPwd: oldPassword };
      toDataBase(accountDetails);
    } else setError("Passwords don't match !");
  }

  return (
    <div>
      <div>
        <div className="account-settings">
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 4 }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="About me" {...a11yProps(0)} />
                <Tab label="Account settings" {...a11yProps(1)} />
                <Tab label="My pets" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <form onSubmit={handleSubmitForm1}>
                <Box
                  sx={{
                    gap: 2,
                    display: "flex",
                    marginBottom: 3,
                  }}
                >
                  <FormControl
                    sx={{
                      gap: 3,
                    }}
                  >
                    <div className="account-img" id="image-container">
                      <FormControl
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                        classname="image-from-control"
                      >
                        <label htmlFor="icon-button-file">
                          <Box>
                            <Input
                              accept="image/*"
                              id="icon-button-file"
                              type="file"
                              name="photo"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  setImg(file);
                                } else {
                                  setImg(null);
                                }
                              }}
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
                    <FormControl fullWidth>
                      <TextareaAutosize
                        aria-label="minimum height"
                        minRows={3}
                        name="bio"
                        placeholder="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </FormControl>
                  </FormControl>
                  <div className="account-info">
                    <FormControl
                      sx={{
                        gap: 2,
                      }}
                    >
                      <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        required
                        name="name"
                        size="small"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />

                      <TextField
                        label="age"
                        type="number"
                        name="age"
                        size="small"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              years
                            </InputAdornment>
                          ),
                        }}
                      />
                      <FormControl>
                        <FormLabel id="Gender">Gender</FormLabel>
                        <RadioGroup
                          aria-labelledby="Gender"
                          name="gender"
                          value={gender}
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 1.5,
                            pt: 2,
                            paddingTop: 0,
                          }}
                          onChange={(e) => setGender(e.target.value)}
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
                      <TextField
                        label="Phone number"
                        type="phone"
                        name="phone"
                        size="small"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </FormControl>
                  </div>
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
            </TabPanel>
            <TabPanel value={value} index={1}>
              <form onSubmit={handleSubmitForm2}>
                <Box
                  sx={{
                    gap: 4,
                    display: "flex",
                    flexDirection: "column",
                    width: "486px",
                    marginBottom: 3,
                  }}
                >
                  <FormControl
                    sx={{
                      gap: 2,
                    }}
                  >
                    <TextField
                      label="email"
                      variant="outlined"
                      fullWidth
                      required
                      name="email"
                      size="small"
                      value={email}
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      label="new password"
                      variant="outlined"
                      fullWidth
                      name="password"
                      size="small"
                      value={newPassword}
                      type="password"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <TextField
                      label="confirm password"
                      variant="outlined"
                      fullWidth
                      name="confirmPassword"
                      size="small"
                      value={confPassword}
                      type="password"
                      onChange={(e) => setConfPassword(e.target.value)}
                    />
                  </FormControl>

                  <FormControl
                    sx={{
                      gap: 1.5,
                    }}
                  >
                    <FormLabel>
                      To save the changes please enter your current password{" "}
                    </FormLabel>
                    <TextField
                      label="current password"
                      variant="outlined"
                      fullWidth
                      name="oldPassword"
                      size="small"
                      required
                      value={oldPassword}
                      type="password"
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <div className="save-btn">
                  <LoadingButton
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    Save
                  </LoadingButton>
                </div>
              </form>
            </TabPanel>
            <TabPanel value={value} index={2} sx={{ padding: 0 }}>
              <div className="avaible-pets">
                {pets.map((pet) => {
                  let userFav = false;
                  if (favPets.includes(pet.id)) userFav = true;
                  return <Card pet={pet} userFav={userFav} />;
                })}
              </div>
            </TabPanel>
          </Box>
          <div></div>
        </div>
      </div>
      {error && <Alert message={error}></Alert>}
    </div>
  );
}
