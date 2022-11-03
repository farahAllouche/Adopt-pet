const initState = { lostpets: [], filter: false, appliedFilter: {} };
const lostPetsReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADDLOST": {
      console.log(action.payload);
      return {
        lostpets: [...state.lostpets, action.payload],
        filter: state.filter,
        appliedFilter: state.appliedFilter,
      };
    }

    case "SETLOST": {
      return {
        lostpets: action.payload,
        filter: state.filter,
        appliedFilter: state.appliedFilter,
      };
    }
    case "FILTERLOST": {
      return {
        lostpets: state.lostpets,
        filter: true,
        appliedFilter: action.payload,
      };
    }
    case "RESETFILTERLOST": {
      return {
        lostpets: state.lostpets,
        filter: initState.filter,
        appliedFilter: initState.appliedFilter,
      };
    }
    default:
      return state;
  }
};
export default lostPetsReducer;
