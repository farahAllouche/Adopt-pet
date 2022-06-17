const initState = [];
const FavReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_FAV_PET": {
      return [...state, action.payload];
    }
    case "SET_FAV_PET": {
      return action.payload;
    }

    case "DELETE_FAV_PET": {
      return state.filter((f) => f.localeCompare(action.payload) != 0);
    }
    default:
      return state;
  }
};
export default FavReducer;
