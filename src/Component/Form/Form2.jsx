import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Slider,
  Box,
} from "@mui/material";
import { height } from "@mui/system";

export default function Form2({ classname, pet = {} }) {
  return (
    <div className={`form-pet-container ${classname}`} id="form2">
      <Box></Box>

      <FormControl>
        <FormLabel id="liveWith">Can live with</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                name="children"
                defaultChecked={pet.children ? pet.children : false}
              />
            }
            label="children"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                name="cats"
                defaultChecked={pet.cats ? pet.cats : false}
              />
            }
            label="cats"
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                name="dogs"
                defaultChecked={pet.dogs ? pet.dogs : false}
              />
            }
            label="dogs"
          />
        </FormGroup>
      </FormControl>
      <Box>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FormLabel>Health</FormLabel>
          <Slider
            aria-label="Health"
            defaultValue={pet.health ? pet.health : 5}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
            sx={{ width: 300 }}
            name="health"
          />
        </FormControl>

        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FormLabel>Activity</FormLabel>
          <Slider
            aria-label="activity"
            defaultValue={pet.activity ? pet.activity : 5}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
            sx={{ width: 300 }}
            name="activity"
          />
        </FormControl>

        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FormLabel>Training</FormLabel>
          <Slider
            aria-label="training"
            defaultValue={pet.training ? pet.training : 5}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
            sx={{ width: 300 }}
            name="training"
          />
        </FormControl>

        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <FormLabel>Kindness</FormLabel>
          <Slider
            aria-label="kindness"
            defaultValue={pet.kindness ? pet.kindness : 5}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
            sx={{ width: 300 }}
            name="kindness"
          />
        </FormControl>
      </Box>
    </div>
  );
}
