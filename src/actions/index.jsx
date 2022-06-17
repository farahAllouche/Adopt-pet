export const signIn = (logInfo) => {
  return {
    type: "SIGNIN",
    payload: logInfo,
  };
};

export const signOut = () => {
  return {
    type: "SIGNOUT",
  };
};

export const switchBg = (etat) => {
  return {
    type: "SWITCH",
    payload: etat,
  };
};

export const addPet = (newPet) => {
  return {
    type: "ADD",
    payload: newPet,
  };
};

export const setPets = (AllPets) => {
  return {
    type: "SET",
    payload: AllPets,
  };
};

export const filterPets = (newFilter) => {
  return {
    type: "FILTER",
    payload: newFilter,
  };
};

export const resetFilter = () => {
  return {
    type: "RESETFILTER",
  };
};

export const updateFavPets = (favPets) => {
  return {
    type: "UPDATE_FAV_PET",
    payload: favPets,
  };
};

export const setFavPets = (favPets) => {
  return {
    type: "SET_FAV_PET",
    payload: favPets,
  };
};
