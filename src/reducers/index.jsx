import loggedReducer from "./loggedReducer";
import petsReducer from "./petsReducer";
import BgReducer from "./BgReducer";
import FavReducer from "./FavReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  pets: petsReducer,
  Bg: BgReducer,
  favPets: FavReducer,
});

export default allReducers;
