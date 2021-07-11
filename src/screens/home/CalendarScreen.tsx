import React, { useEffect } from 'react'; 
import { useSelector } from 'react-redux';
import { selectCards } from '../../redux/selectors/cards';
import { View, Text, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import CalendarCard from '../../components/home/CalendarCard';
import { CardModelWithUid } from '../../database/models/cards';
import theme from '../../styles/theme.style';
import { getDayText } from '../../util/dateFormat';

const CalendarScreen: React.FC = ({navigation}: any) => {

	// formats date for calendar because calendar requires certain format
	const getDateString = (date: Date): string => {
		const month = date.getMonth() + 1;
		const dateNum = date.getDate()
		return `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${dateNum < 10 ? '0' + dateNum : dateNum}`;
	};

		
	const [date, setDate] = React.useState(new Date());
	const cards: CardModelWithUid[] = useSelector(selectCards);

	//selected date represents the date selected by the user
	const [selectedDate, setSelectedDate] = React.useState({
		[getDateString(date)]: { selected: true, selectedColor: theme['color-primary-400']}
	});
	
	const singleEvent = {startingDay: true, endingDay: true, color: theme['color-warning-200']};
	const colors = [theme['color-danger-200'], theme['color-info-200'], theme['color-success-200']];

	const getEventColor = (start: Date, end: Date, md: Record<string, Object>): String => {
		let count = 0;
		for (let date = new Date(start.toString()); date <= end; date.setDate(date.getDate() + 1)) {
			if (md.hasOwnProperty(getDateString(date))) {
				if (md[getDateString(date)].hasOwnProperty('periods')) {
					count = Math.max(count, md[getDateString(date)].periods.length);
				}
			}
		}
		return colors[count];
	}

	// returns a collection of the selected date as well as the marked dates
	// which are dates with events. 
	const getMarkedDates = () => {
		const md: Record<string, Object> = {};
		cards.forEach(card => {
			if (typeof card.startdate === 'string') {
				card.startdate = new Date(card.startdate);
				card.duedate = new Date(card.duedate);
			}
			if (card.startdate.toDateString() === card.duedate.toDateString()) {
				if (md.hasOwnProperty(getDateString(card.startdate))) {
					if (md[getDateString(card.startdate)].hasOwnProperty('period')) {
						if (!md[getDateString(card.startdate)].periods.includes(singleEvent)) {
							md[getDateString(card.startdate)].periods.push(singleEvent);
						}
					}
				} else {
					md[getDateString(card.startdate)] = { periods: [singleEvent], ...md[getDateString(card.startdate)] };
				}
			} else {
				let date = new Date(card.startdate.toString());
				let eventColor = getEventColor(card.startdate, card.duedate, md);
				if (md.hasOwnProperty(getDateString(date))) {
					if (md[getDateString(date)].hasOwnProperty('periods')) {
						const len = md[getDateString(date)].periods.length;
						if (len > 3) {
							return;
						}
						md[getDateString(date)].periods.push({startingDay: true, endingDay: false, color: eventColor});
					} else {
						md[getDateString(date)].periods = [{startingDay:true, endingDay: false, color: eventColor}];
					}
				} else {
					md[getDateString(date)] = {};
					md[getDateString(date)].periods = [{startingDay:true, endingDay: false, color: eventColor}];
				}
				for (date.setDate(date.getDate() + 1); date < card.duedate; date.setDate(date.getDate() + 1)) {
					if (md.hasOwnProperty(getDateString(date))) {
						if (md[getDateString(date)].hasOwnProperty('periods')) {
							md[getDateString(date)].periods.push({startingDay: false, endingDay: false, color: eventColor});
						} else {
							md[getDateString(date)].periods = [{startingDay:false, endingDay: false, color: eventColor}];
						}
					} else {
							md[getDateString(date)] = {};
							md[getDateString(date)].periods = [{startingDay:false, endingDay: false, color: eventColor}];
					}
				}
				if (md.hasOwnProperty(getDateString(date))) {
					if (md[getDateString(date)].hasOwnProperty('periods')) {
							md[getDateString(date)].periods.push({startingDay: false, endingDay: true, color: eventColor});
					} else {
						md[getDateString(date)].periods = [{startingDay:false, endingDay: true, color: eventColor }];
					}
				} else {
					md[getDateString(date)] = {};
					md[getDateString(date)].periods = [{startingDay:false, endingDay: true, color: eventColor}];
				}
			}
		});
		return {...md, ...selectedDate};
	};

	// marked dates represent dates with events
	const [markedDates, setMarkedDates] = React.useState(getMarkedDates());
	
	const handleDateChange = (day: any) => {
		const newDate = new Date(day.dateString);
		const dateString = day.dateString;
		setDate(newDate);
		setSelectedDate({
			[dateString]: { selected: true, selectedColor: theme['color-primary-400'], ...markedDates[dateString]}, 
		}, );
	};

	useEffect(() => {
		setMarkedDates(getMarkedDates());
	}, [selectedDate]);
	
	const filterByToday = (card: CardModelWithUid): boolean => {
		if (typeof card.startdate === 'string' || typeof card.duedate === 'string') {
			card.startdate = new Date(card.startdate);
			card.duedate = new Date(card.duedate);
		}
		return (card.startdate.toDateString() === date.toDateString() ||
			card.duedate.toDateString() === date.toDateString()) ||
			(card.startdate < date && card.duedate > date);
	};
	
	const clickHandler = (card: CardModelWithUid) => navigation.navigate('UpdateCardModal', card);

	const renderItem = (item: any) => <CalendarCard info={item} clickHandler={clickHandler}/>;

	return (
		<View>
			<Calendar 
				style={{marginBottom: 30}} 
				enableSwipeMonths={true} 
				onDayPress={day => handleDateChange(day)} 
				markingType='multi-period'
				markedDates={markedDates}
				// onDayLongPress={() => navigation.navigate('CreateCardModal')} 
			/>
			<View style={{marginLeft: 15, display: 'flex', flexDirection: 'row', width: '100%'}}>
				<View style={{marginRight: 15}}>
					<Text style={{fontSize: 20}}>{date.getDate()}</Text>
					<Text style={{fontSize: 20}}>{getDayText(date.getDay())}</Text>
				</View>
				<FlatList
					data={cards.filter(filterByToday)}
					renderItem={renderItem}
					keyExtractor={({title}, index) => `${title}${index}`} 
				/>
			</View>
		</View>
	);
};

export default CalendarScreen; 