// TODO: add more selectors
import { isSameMonth } from '../../util/timeformatter';
import { CardModelWithUid } from '../../database/models/cards';
import { RootState } from '../store';
import { Cards } from '../reducers/cards';

export const selectAllCards = (state: RootState): CardModelWithUid[] => Object.values(state.cards);

export const selectCardsByMonth = (selectedMonth: number) => (state: RootState): CardModelWithUid[] => Object.values(state.cards).filter((card: CardModelWithUid)=> isSameMonth(new Date(card.startdate).getMonth(), selectedMonth)
&& isSameMonth(new Date(card.duedate).getMonth(), selectedMonth));

export const selectCardByUID = (uid: string) => (state: RootState): CardModelWithUid=> Object.values(state.cards).filter(card => card.uid === uid)[0]; 

export const selectCardsObject = (state: RootState): Cards => state.cards;