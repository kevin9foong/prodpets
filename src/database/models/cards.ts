import db from '../index';
// import firebase from 'firebase/app';
import 'firebase/firestore';
import { ChecklistItem } from '../../components/Checklist';

export type cardStatus = 'completed' | 'in progress' | 'incomplete';
export interface CardModelWithUid<DateType = Date> extends CardModel<DateType> {
	uid: string
}
export interface CardModel<DateType = Date> { 
    title: string, 
    description: string,
	startdate: DateType,
	duedate: DateType, 
	effortHours: number, 
	tags: string[],
	status: cardStatus, 
	checklistItems: ChecklistItem[]
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
export const fetchCards = async (userUid: string): Promise<CardModelWithUid[]> => {
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

	// need to store into Redux store. 
	return Promise.all(cardsDataPromises).then(
		(cardsData) => {
			return cardsData.map(card => {
				return ({
					...card,
					startdate: card.startdate.toDate(),
					duedate: card.duedate.toDate()
				} as CardModelWithUid);});});
};


export const updateCard = (userUid: string, cardUid: string, card: CardModel) => {
	return db.collection('users').doc(userUid).collection('cards')
		.doc(cardUid).update({
			...card
		});
};