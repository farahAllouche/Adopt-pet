import React from "react";
import { Button } from "@mui/material";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { setPets } from "../actions";
import { useDispatch, useSelector } from "react-redux";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog({ petId }) {
  const [open, setOpen] = React.useState(false);
  const pets = useSelector((state) => state.pets.pets);
  const dispatch = useDispatch();

  function handleDelete() {
    axios
      .delete(`https://cat-dog-adoption.herokuapp.com/pets/delete/${petId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const newPets = pets.filter((p) => p.id != petId);
        console.log(newPets);
        dispatch(setPets(newPets));
        setOpen(false);
      })
      .catch((error) => console.log(error));
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="delete-but" onClick={handleClickOpen}>
        <IconButton
          aria-label="delete"
          className="delete"
          style={{ color: "var(--kata)" }}
        >
          <DeleteOutlineIcon style={{ fontSize: 20, color: "var(--kata)" }} />
        </IconButton>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete this pet ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDelete}
            color="secondary"
            variant="contained"
            type="button"
          >
            Yes
          </Button>
          <Button onClick={handleClose} sx={{ color: "var(--kata)" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
