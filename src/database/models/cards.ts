import db from '../index';
import 'firebase/firestore';

export type CardModel = { 
    title: string, 
    description: string
}

// make sure we use the local offline store as much as possible 
// - unless we explicitly request to sync with online.
const getOptions = {
	source: 'cache'
};

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
	return db.collection('users').doc(userUid).collection('todos').limit(2)
		.get(getOptions).then(querySnapshot => querySnapshot.docs.map(doc => doc.data())); 
};