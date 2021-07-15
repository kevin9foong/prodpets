import { getTimeRange } from '../timeformatter';

it('generates the correct time range string for same date', () => {
	const startDate = new Date(2021, 6, 12, 10, 30);
	const endDate = new Date(2021, 6, 12, 11, 40); 

	const formattedString = getTimeRange(startDate, endDate); 
	expect(formattedString).toBe('12 Jul 21, 10:30 - 11:40');
});

it('generates the correct time range string for different date', () => {
	const startDate = new Date(2021, 5, 13, 9, 12);
	const endDate = new Date(2021, 6, 12, 11, 40); 

	const formattedString = getTimeRange(startDate, endDate); 
	expect(formattedString).toBe('13 Jun 21, 9:12 - 12 Jul 21, 11:40');
});