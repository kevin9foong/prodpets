import { CardModelWithUid } from '../../database/models/cards';
import { addCardAction, deleteCardAction, fetchCardsAction, updateCardAction } from '../actions/cards';

export type Cards = {
	// cardUid: cardData 
	[uid: string]: CardModelWithUid
}

const initialState: Cards = {}; 

const cardsReducer = (state = initialState, action: addCardAction | updateCardAction | deleteCardAction | fetchCardsAction): Cards => {
	switch(action.type) {
	case 'cards/fetchCards': { 
		// TODO: fix implementation later with syncing online mode with offline state
		// return [...state];
		return {};
	}
	case 'cards/addCard': {
		return {...state, [action.payload.cardInfo.uid]: action.payload.cardInfo};
	}
	case 'cards/updateCard': {
		const newCards = {...state};
		newCards[action.payload.cardInfo.uid] = action.payload.cardInfo;
		return newCards;
	}
	case 'cards/deleteCard': {
		const newCards = {...state};
		delete newCards[action.payload.uid]; 
		return newCards;
	}
	default: {
		return state;
	}
	}
};


export default cardsReducer; 