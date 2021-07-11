export const getDayText = (dayNum: number): string => {
	switch (dayNum) {
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

export const getMonthText = (monthNum: number): string => {
	switch (monthNum) {
	case 0: return'Jan'; 
	case 1: return 'Feb'; 
	case 2: return 'Mar';
	case 3: return 'Apr';
	case 4: return 'May';
	case 5: return 'Jun';
	case 6: return 'Jul';
	case 7: return 'Aug';
	case 8: return 'Sep';
	case 9: return 'Oct';
	case 10: return 'Nov';
	case 11: return 'Dec';
	default: return ''; 
	}
};

export const formatMinutes = (mins: number): string => {
	return mins === 0 ? '00' : mins.toString();
};

export const getTimeRange = (startDate: Date, endDate: Date): string => { 
	const isSameDay = startDate.getDate() === endDate.getDate(); 
	const startMonthText = getMonthText(startDate.getMonth());
	const endMonthText = getMonthText(endDate.getMonth());

	const startTime = startDate.getHours() + ':' + formatMinutes(startDate.getMinutes());
	const endTime = endDate.getHours() + ':' + formatMinutes(endDate.getMinutes());

	if (isSameDay) {
		return `${startDate.getDate()} ${startMonthText}, ${startTime} - ${endTime}`;
	} else {
		return `${startDate.getDate()} ${startMonthText}, ${startTime} - ${endDate.getDate()} ${endMonthText}, ${endTime}`;
	}
};  
