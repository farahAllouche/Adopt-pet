import "./App.css";
import Home from "./pages/Home";
import Header from "./Component/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Adopt from "./pages/Adopt";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import { useState, useEffect } from "react";
import RequireLogout from "./RequireLogout";
import SideBar from "./Component/SideBar";
import Rehome from "./pages/Rehome";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Account from "./pages/Account";
import { useDispatch, useSelector } from "react-redux";
import { signIn, setPets, setFavPets, setLostPets } from "./actions";
import Description from "./pages/Description";
import Update from "./pages/Update";
import User from "./pages/User";
import AddLost from "./pages/AddLost";
import LostPets from "./pages/LostPets";
import UpdateLost from "./pages/UpdateLost";

const theme = createTheme({
  palette: {
    action: {},
    primary: {
      main: "#746452",
      light: "#746452",
      dark: "#746452",
    },
    secondary: {
      main: "#7b1818",
    },
    tr: {
      background: "red",
      "&:hover,&:focus": {
        background: "red",
      },
    },
  },
});

function App() {
  const [sideBar, setSideBar] = useState(0);
  const [error, setError] = useState(true);
  const [fav, setFav] = useState([]);

  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();
  const bgImage = useSelector((state) => state.Bg.bgImage);
  console.log("bg ", bgImage);

  useEffect(() => {
    console.log("useEffect");
    axios
      .get(`https://adopt-pet-be.onrender.com/account`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const signInfo = {
          userName: res.data.name,
          photo: res.data.photo,
          id: res.data.id,
        };
        dispatch(signIn(signInfo));
      })
      .catch((error) => setError(error.response.data.message));
  }, []);

  useEffect(() => {
    isLogged &&
      axios
        .get(`https://adopt-pet-be.onrender.com/pets/`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          dispatch(setPets(res.data));
        })
        .catch((error) => setError(error.response));
  }, [isLogged.id]);

  useEffect(() => {
    isLogged &&
      axios
        .get(`https://adopt-pet-be.onrender.com/lostPet/`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          dispatch(setLostPets(res.data));
        })
        .catch((error) => setError(error.response));
  }, [isLogged.id]);

  useEffect(() => {
    axios
      .get(`https://adopt-pet-be.onrender.com/account`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.intrestedIn);
        dispatch(setFavPets(res.data.intrestedIn));
      })
      .catch((error) => setError(error));
  }, [isLogged.id]);

  console.log("re render app");
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div
          className={bgImage ? `page-containt withBg` : `page-containt noBg`}
        >
          <div className="content">
            <Header setSideBar={setSideBar} sideBar={sideBar}></Header>
            <Routes>
              <Route
                path="/register"
                element={
                  <RequireLogout>
                    <Register></Register>
                  </RequireLogout>
                }
              ></Route>
              <Route
                path="/login"
                element={
                  <RequireLogout>
                    <Login></Login>
                  </RequireLogout>
                }
              ></Route>
              <Route path="/" element={<Home />}></Route>
              <Route
                path="/adopt"
                element={
                  <RequireAuth>
                    <Adopt theme={theme} />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/rehome"
                element={
                  <RequireAuth>
                    <Rehome></Rehome>
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/account"
                element={
                  <RequireAuth>
                    <Account></Account>
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/description/:petId"
                element={
                  <RequireAuth>
                    <Description></Description>
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/update/:petId"
                element={
                  <RequireAuth>
                    <Update></Update>
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/user/:userId"
                element={
                  <RequireAuth>
                    <User></User>
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/lostPets"
                element={
                  <RequireAuth>
                    <LostPets theme={theme}></LostPets>
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/foundPet"
                element={
                  <RequireAuth>
                    <AddLost></AddLost>
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="/UpdateLostPet/:petId"
                element={
                  <RequireAuth>
                    <UpdateLost></UpdateLost>
                  </RequireAuth>
                }
              ></Route>
            </Routes>
          </div>
        </div>
        <SideBar setSideBar={setSideBar} sideBar={sideBar}></SideBar>
      </div>
    </ThemeProvider>
  );
}

export default App;
