export type addXpAction = {
  type: "pet/addXp";
  payload: {
    index: number;
    xp: number;
  };
};

export type changeNameAction = {
  type: "pet/changeName";
  payload: {
    index: number;
    name: string;
  };
};

export const addXp = (xp: number, index: number): addXpAction => ({
  type: "pet/addXp",
  payload: {
    index,
    xp,
  },
});

export const changeName = (name: string, index: number): changeNameAction => ({
  type: "pet/changeName",
  payload: {
    index,
    name,
  },
});
