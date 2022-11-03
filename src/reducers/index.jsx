import loggedReducer from "./LoggedReducer";
import petsReducer from "./petsReducer";
import lostpetsReducer from "./LostPetsReducer";
import BgReducer from "./BgReducer";
import FavReducer from "./FavReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  pets: petsReducer,
  Bg: BgReducer,
  favPets: FavReducer,
  lostPets: lostpetsReducer,
});

export default allReducers;
