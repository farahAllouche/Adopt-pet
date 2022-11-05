import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Card, Box } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@mui/material";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLostPets } from "../actions";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";

import { MdExpandMore, MdOutlineShare, MdMoreVert } from "react-icons/md";

import "./Card.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CardLost({ pet }) {
  const [expanded, setExpanded] = React.useState(false);
  const [user, setUser] = useState({});
  const [open, setOpen] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);

  const dispatch = useDispatch();

  const lostPets = useSelector((state) => state.lostPets.lostpets);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
  useEffect(() => {
    axios
      .post(
        `http://localhost:4000/user`,
        { userId: pet.userId },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("user", res.data);
        setUser(res.data);
      })
      .catch((error) => setError(error));
  }, []);

  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };

  function handleDelete() {
    axios
      .delete(`http://localhost:4000/lostPet/delete/${pet.id}`, {
        withCredentials: true,
      })
      .then((res) => {
        const newPets = lostPets.filter((p) => p.id != pet.id);
        console.log("newPets", newPets);
        setDialog(false);
        dispatch(setLostPets(newPets));
      })
      .catch((error) => console.log(error));
  }

  return (
    <Card sx={{ maxWidth: 600 }}>
      <CardHeader
        avatar={<Avatar alt="Remy Sharp" src={user.photo} />}
        action={
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              position: "relative",
            }}
            component="nav"
          >
            <IconButton
              onClick={handleClick}
              aria-label="settings"
              style={{ color: "var(--teemo)" }}
            >
              <MdMoreVert />
            </IconButton>
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
              sx={{
                position: "absolute",
                top: "55px",
                left: "-150px",
                backgroundColor: "white",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              <List component="div" disablePadding>
                <ListItemButton
                  style={{ color: "var(--teemo)" }}
                  onClick={handleClickOpen}
                >
                  <ListItemIcon>
                    <DeleteOutlineIcon style={{ color: "var(--teemo)" }} />
                  </ListItemIcon>
                  <ListItemText primary="Delete Report" />
                </ListItemButton>
                <Link to={`/UpdateLostPet/${pet.id}`}>
                  <ListItemButton style={{ color: "var(--teemo)" }}>
                    <ListItemIcon>
                      <EditIcon style={{ color: "var(--teemo)" }} />
                    </ListItemIcon>
                    <ListItemText primary="Edit Report" />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>

            <Dialog
              open={dialog}
              onClose={handleClose}
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
              >
                Delete
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to permanently delete this pet ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  color="secondary"
                  variant="contained"
                  type="button"
                  onClick={handleDelete}
                >
                  Yes
                </Button>
                <Button onClick={handleClose} sx={{ color: "var(--kata)" }}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </List>
        }
        title={user.name}
        subheader={pet.date}
      />
      <Box sx={{ display: "flex", gap: "40px", padding: "15px" }}>
        <CardMedia
          component="img"
          sx={{
            width: "250px",
            height: "150px",
            borderRadius: "2px",
          }}
          image={pet.photo}
          alt="lost pet photo"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column" }}
            className="foundPetInformation"
          >
            <div>
              <p>Age :</p> <span>{pet.age}</span>{" "}
            </div>
            <div>
              <p>Spices :</p> <span>{pet.spices}</span>{" "}
            </div>

            <div>
              <p>Breed :</p> {pet.breed ? <span>{pet.breed}</span> : "unknown"}
            </div>

            <div>
              <p>Location :</p>{" "}
              <span>
                {pet.state} {pet.town && ", "} {pet.town}{" "}
              </span>{" "}
            </div>
          </Box>
        </Box>
      </Box>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <MdExpandMore />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <div className="foundPetInformation">
          <div>
            <p>Details :</p>
          </div>
          <div>{pet.details} </div>
        </div>
      </Collapse>
    </Card>
  );
}
