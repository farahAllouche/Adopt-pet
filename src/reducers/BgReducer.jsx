const initState = { bgImage: true };
const BgReducer = (state = initState, action) => {
  switch (action.type) {
    case "SWITCH": {
      return { bgImage: action.payload };
    }
    default:
      return state;
  }
};
export default BgReducer;
