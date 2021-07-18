import { CardModelWithUid } from '../../database/models/cards';

const initialState: CardModelWithUid[] = []; 

const cardsReducer = (state = initialState, action): CardModelWithUid[] => {
	switch(action.type) {
	case 'cards/fetchCards': { 
		// TODO: fix implementation later with syncing online mode with offline state
		// return [...state];
		return [];
	}
	case 'cards/addCard': {
		return [...state, {uid: action.payload.uid, ...action.payload.cardInfo}];
	}
	case 'cards/updateCard': {
		return [...state.filter(card => card.uid !== action.payload.cardInfo.uid),
			{...action.payload.cardInfo}];
	}
	case 'cards/deleteCard': {
		return state.filter(card => card.uid !== action.payload.cardUid);
	}
	default: {
		return state;
	}
	}
};


export default cardsReducer; 