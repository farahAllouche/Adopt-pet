const initState = { isLogged: false, userName: "", photo: "" };
const loggedReducer = (state = initState, action) => {
  switch (action.type) {
    case "SIGNIN": {
      return {
        isLogged: true,
        id: action.payload.id,
        userName: action.payload.userName,
        photo: action.payload.photo,
      };
    }
    case "SIGNOUT": {
      return { isLogged: false, userName: "", photo: "", id: "" };
    }
    default:
      return state;
  }
};
export default loggedReducer;
