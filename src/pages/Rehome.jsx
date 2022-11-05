import React, { useEffect, useState } from "react";
import DropDownMenu from "../Component/DropDownMenu";
import { BsFillCameraFill } from "react-icons/bs";
import StepperComponent from "../Component/Stepper";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Form1 from "../Component/Form/Form1";
import Form2 from "../Component/Form/Form2";
import Form3 from "../Component/Form/Form3";
import axios from "axios";
import { storage } from "../FireBase/indexx";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../Component/Alert";
import { useDispatch, useSelector } from "react-redux";
import { switchBg } from "../actions";
import { addPet } from "../actions";

const Input = styled("input")({
  display: "none",
});
const steps = ["Personal information", "Characteristic & Behaviour", "Story"];

export default function Rehome() {
  const [activeStep, setActiveStep] = useState(0);
  const [showF1, setShowF1] = useState(true);
  const [showF2, setShowF2] = useState(false);
  const [showF3, setShowF3] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);

  const navigator = useNavigate();
  const dispatch = useDispatch();

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

  const toDataBase = (newPet) => {
    axios
      .post(`http://localhost:4000/pets/add`, newPet, {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        dispatch(addPet(res.data));
        navigator("/adopt", { replace: true });
      })
      .catch((error) => console.log(error));
  };

  const handleNext = () => {
    if (activeStep === 0) {
      const form1 = [
        ...document.getElementById("form1").querySelectorAll("[required]"),
      ];
      const allValid = form1.every((input) => input.reportValidity());
      if (allValid) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setShowF1(false);
        setShowF2(true);
      }
    } else if (activeStep === 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setShowF2(false);
      setShowF3(true);
    } else if (activeStep === 2) {
      const form3 = [
        ...document.getElementById("form3").querySelectorAll("[required]"),
      ];
      const allValid = form3.every((input) => input.reportValidity());
      if (allValid) setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 2) {
      setShowF2(true);
      setShowF3(false);
    } else if (activeStep === 1) {
      setShowF2(false);
      setShowF1(true);
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const name = e.target.name.value;
    const spices = e.target.spices.value;
    const breed = e.target.breed.value;
    const state = e.target.state.value;
    const town = e.target.town.value;
    const ageY = e.target.ageY.value;
    const ageM = e.target.ageM.value;
    const weight = e.target.weight.value;
    const gender = e.target.gender.value;
    const vaccinated = e.target.vaccinated.value;
    const photo = e.target.photo.files[0];
    const children = e.target.children.checked;
    const cats = e.target.cats.checked;
    const dogs = e.target.dogs.checked;
    const health = e.target.health.value;
    const activity = e.target.activity.value;
    const training = e.target.training.value;
    const kindness = e.target.kindness.value;
    const about = e.target.about.value;
    console.log("in submit", weight);

    const newPet = {
      name,
      spices,
      breed,
      state,
      town,
      ageY,
      ageM,
      weight: Number(weight),
      gender,
      vaccinated,
      photo,
      children,
      cats,
      dogs,
      health,
      activity,
      training,
      kindness,
      about,
    };

    photo ? handleUpload(newPet) : toDataBase(newPet);
  };

  return (
    <div>
      <StepperComponent
        steps={steps}
        activeStep={activeStep}
      ></StepperComponent>

      <form onSubmit={handleSubmit} id="form">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form1 classname={showF1 ? "" : "hidden-form "} />
          <Form2 classname={showF2 ? "" : "hidden-form "} />
          <Form3 classname={showF3 ? "" : "hidden-form "} />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            pt: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              pt: 2,
              width: 400,
            }}
          >
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              color="primary"
              variant="outlined"
            >
              Back
            </Button>
            {activeStep === steps.length - 1 ? (
              <LoadingButton
                loading={loading}
                variant="contained"
                color="secondary"
                type="submit"
              >
                Submit
              </LoadingButton>
            ) : (
              <Button
                onClick={handleNext}
                color="secondary"
                variant="contained"
                type="button"
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </form>

      {error && <Alert message={error}></Alert>}
    </div>
  );
}
