import db from '../index';
import firebase from 'firebase/app';
import 'firebase/firestore';

export interface CardModelWithUid<DateType = Date> extends CardModel<DateType> {
	uid: string
}

export interface CardModel<DateType = Date> { 
    title: string, 
    description: string,
	startdate: DateType,
	duedate: DateType
}

// make sure we use the local offline store as much as possible 
// - unless we explicitly request to sync with online.
const getOptions = {
	source: 'cache'
};

export const saveCard = (userUid: string, card: CardModel) => {
	return db.collection('users').doc(userUid)
		.collection('cards')
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
export const fetchCards = async (userUid: string) => {
	console.log('FETCHING TRIGGERED');
	const cardsQuerySnapShot = await db.collection('users').doc(userUid)
		.collection('cards').limit(5).get();
	const cardsQuerySnapShotDocs = cardsQuerySnapShot.docs; 

	const cardsDataPromises = cardsQuerySnapShotDocs.map(async doc => {
		const uid = doc.id; 
		const docData = await doc.data(); 
		return {
			uid, 
			...docData
		};
	});

	return Promise.all(cardsDataPromises).then(
		cardsData => {
			// console.log(cardsData);
			return cardsData.map(card => {
				console.log(card);
				return ({
					...card,
					startdate: card.startdate.toDate(),
					duedate: card.duedate.toDate()
				});});});
};


export const updateCard = (userUid: string, cardUid: string, card: CardModel) => {
	return db.collection('users').doc(userUid).collection('cards')
		.doc(cardUid).update({
			...card
		});
};