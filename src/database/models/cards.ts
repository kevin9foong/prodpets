import db from '../index';
import 'firebase/firestore';

export type CardModel = { 
    title: string, 
    description: string
}

export const saveCard = (userUid: string, card: CardModel) => {
	return db.collection('users').doc(userUid)
		.collection('todos')
		.add({
			title: card.title,
			description: card.description
		});
};

// TODO: add sorting, filter data in the future.
/**
 * Returns a promise of user items.
 * @param userUid unique user id
 * @returns 
 */
export const fetchCards = (userUid: string) => {
	return db.collection('users').doc(userUid).collection('todos').get()
		.then(querySnapshot => querySnapshot.docs.map(doc => doc.data())); 
};