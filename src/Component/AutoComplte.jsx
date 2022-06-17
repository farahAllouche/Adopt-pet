import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function MyAutocomplete({ options, title, setInput }) {
  const handleChange = (event, value) => setInput(value);
  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={options}
      onChange={handleChange}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField {...params} label={title} name={title} />
      )}
    />
  );
}
