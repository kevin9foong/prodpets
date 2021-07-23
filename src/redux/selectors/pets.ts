import { RootState } from "../store";
import { PetsState } from "../reducers/pets";

export const selectPetByIndex =
  (index: number) =>
  (state: RootState): PetsState =>
    Object.values(state.pets)[index];

export const selectAllPets = (state: RootState) => Object.values(state.pets)[0];
