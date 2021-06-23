import db from '../index';
import 'firebase/firestore';

export interface CardModelWithUid extends CardModel {
	uid: string
}

export interface CardModel { 
    title: string, 
    description: string,
	startdate: Date,
	duedate: Date
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
			...card
		});
};

// TODO: add sorting, filter data in the future.
/**
 * Returns a promise of user items.
 * @param userUid unique user id
 * @returns 
 */
export const fetchCards = (userUid: string) => {
	console.log('FETCHING TRIGGERED');
	return db.collection('users').doc(userUid).collection('todos').limit(5)
		.get().then(querySnapshot => querySnapshot.docs.map(doc => {return {uid: doc.id, ...doc.data()};})); 
};

export const updateCard = (userUid: string, cardUid: string, card: CardModel) => {
	return db.collection('users').doc(userUid).collection('todos')
		.doc(cardUid).update({
			...card
		});
};