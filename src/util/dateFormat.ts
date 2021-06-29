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
	let start;
	let end;
	if (card.startdate.toDateString() === card.duedate.toDateString()) {
		start = card.startdate.getHours() + ':' + formatMinutes(card.startdate.getMinutes());
		end = card.duedate.getHours() + ':' + formatMinutes(card.duedate.getMinutes());
	} else {
		start = card.startdate.getDate() + "/" + (card.startdate.getMonth() + 1);
		end = card.duedate.getDate() + "/" + (card.duedate.getMonth() + 1);
	}
	return `${start} - ${end}`;
};  