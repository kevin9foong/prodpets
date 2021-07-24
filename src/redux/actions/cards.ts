import { CardModel, CardModelWithUid } from '../../database/models/cards';
import { fetchCards as fetchCardsFromDb } from '../../database/models/cards';

export type fetchCardsAction = { 
	type: 'cards/fetchCards', 
	payload: {
		cards: CardModelWithUid[],
	}
}

export type addCardAction = { 
	type: 'cards/addCard', 
	payload: {
		cardInfo: CardModelWithUid,
	}
}

export type updateCardAction = { 
	type: 'cards/updateCard', 
	payload: {
		cardInfo: CardModelWithUid
	}
}

export type deleteCardAction = { 
	type: 'cards/deleteCard', 
	payload: {
		uid: string
	}
}

// TODO: implement next time
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const fetchCards = async (dispatch, getState) => {
	const userUid = getState().user.userUid;
	const cards = !userUid ? [] : await fetchCardsFromDb(userUid);
	dispatch({
		type: 'cards/fetchCards', 
		payload: {
			cards
		}
	});
};

export const addCard = (uid: string, cardInfo: CardModel): addCardAction => ({
	type: 'cards/addCard', 
	payload: {
		cardInfo: 
		{...cardInfo,
			uid}
	}
});

export const updateCard = (cardInfo: CardModelWithUid): updateCardAction => ({
	type: 'cards/updateCard', 
	payload: {
		cardInfo
	}
});

export const deleteCard = (uid: string): deleteCardAction => ({
	type: 'cards/deleteCard', 
	payload: {
		uid
	}
});