import React from "react";
import { FormControl, FormLabel, TextareaAutosize } from "@mui/material";

export default function Form3({ classname, pet = {} }) {
  return (
    <div className={`form-pet-container ${classname}`} id="form3">
      <FormControl fullWidth>
        <FormLabel>More about your pet !</FormLabel>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={20}
          required
          name="about"
          defaultValue={pet ? pet.about : ""}
        />
      </FormControl>
    </div>
  );
}
