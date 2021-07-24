export interface PetObject {
  name: String;
  level: number;
  xp: number;
  maxXp: number;
}

export interface PetsState {
  pets: Array<PetObject>;
}

const initialState: PetsState = {
  pets: [
    {
      name: "Bob",
      level: 1,
      xp: 0,
      maxXp: 100,
    },
  ],
};

const petsReducer = (state = initialState, action): PetsState => {
  switch (action.type) {
    case "pets/addXp": {
      let pet = state.pets[action.payload.index];
      if (pet.xp + action.payload.xp > pet.maxXp) {
        pet = {
          level: pet.level + 1,
          xp: action.payload.xp - (pet.maxXp - pet.xp),
          maxXp: pet.maxXp + 100, // change this later
          name: pet.name,
        };
        return { pets: [pet, ...state.pets] };
      } else {
        pet = {
          xp: pet.xp + action.payload.xp,
          maxXp: pet.maxXp,
          name: pet.name,
          level: pet.level,
        };
        // tried using the spread operator here but was getting some weird warning
        // that xp would get overwritten
        return { pets: [pet, ...state.pets] };
      }
    }
    default: {
      return state;
    }
  }
};

export default petsReducer;
