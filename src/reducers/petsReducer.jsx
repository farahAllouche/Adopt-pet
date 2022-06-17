const initState = { pets: [], filter: false, appliedFilter: {} };
const petsReducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD": {
      console.log(action.payload);
      return {
        pets: [...state.pets, action.payload],
        filter: state.filter,
        appliedFilter: state.appliedFilter,
      };
    }

    case "SET": {
      return {
        pets: action.payload,
        filter: state.filter,
        appliedFilter: state.appliedFilter,
      };
    }
    case "FILTER": {
      return {
        pets: state.pets,
        filter: true,
        appliedFilter: action.payload,
      };
    }
    case "RESETFILTER": {
      return {
        pets: state.pets,
        filter: initState.filter,
        appliedFilter: initState.appliedFilter,
      };
    }
    default:
      return state;
  }
};
export default petsReducer;
