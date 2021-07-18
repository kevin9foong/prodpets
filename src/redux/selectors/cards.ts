// TODO: add more selectors
import { isSameMonth } from '../../util/timeformatter';
import { CardModelWithUid } from '../../database/models/cards';
import { RootState } from '../store';

export const selectAllCards = (state: RootState): CardModelWithUid[] => state.cards;

export const selectCardsByMonth = (selectedMonth: number) => (state: RootState): CardModelWithUid[] => state.cards.filter((card: CardModelWithUid)=> isSameMonth(new Date(card.startdate).getMonth(), month)
&& isSameMonth(new Date(card.duedate).getMonth(), selectedMonth));

export const selectCardByUID = (uid: string) => (state: RootState): CardModelWithUid[] => state.cards.filter(card => card.uid === uid)[0]; 
