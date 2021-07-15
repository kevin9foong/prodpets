// TODO: add more selectors
export const selectCards = state => state.cards;
export const selectCardByUID = (uid: string) => state => state.cards.filter(card => card.uid === uid)[0]; 
