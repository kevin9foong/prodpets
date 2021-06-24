import { CardModel, CardModelWithUid } from '../../database/models/cards';
import { fetchCards as fetchCardsFromDb } from '../../database/models/cards';

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

export const addCard = (uid, cardInfo: CardModel) => ({
	type: 'cards/addCard', 
	payload: {
		cardInfo,
		uid
	}
});

export const updateCard = (cardInfo: CardModelWithUid) => ({
	type: 'cards/updateCard', 
	payload: {
		cardInfo
	}
});

export const deleteCard = (cardUid: string) => ({
	type: 'cards/deleteCard', 
	payload: {
		cardUid
	}
});