import { PetObject } from "../reducers/pets";

export type addXpAction = {
  type: "pet/addXp";
  payload: {
    index: number;
    xp: number;
  };
};

export const addXp = (xp: number, index: number): addXpAction => ({
  type: "pets/addXp",
  payload: {
    index,
    xp,
  },
});
