import { CardModelWithUid } from '../database/models/cards';

export const getDayText = (num: number): string => {
	switch (num) {
	case 1:
		return 'Mon';
	case 2:
		return 'Tue';
	case 3:
		return 'Wed';
	case 4:
		return 'Thu';
	case 5:
		return 'Fri';
	case 6:
		return 'Sat';
	case 0:
		return 'Sun';
	default:
		return '';
	}
};

export const formatMinutes = (mins: number): string => {
	return mins === 0 ? '00' : mins.toString();
};

export const getTimeRange = (card: CardModelWithUid): string => {
	const start = card.startdate.getHours() + ':' + formatMinutes(card.startdate.getMinutes());
	const end = card.duedate.getHours() + ':' + formatMinutes(card.duedate.getMinutes());
	return `${start} - ${end}`;
};  