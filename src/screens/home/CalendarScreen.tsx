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

		return `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${date.getDate()}`;
	};

		
	const [date, setDate] = React.useState(new Date());
	const cards: CardModelWithUid[] = useSelector(selectCards);

	//selected date represents the date selected by the user
	const [selectedDate, setSelectedDate] = React.useState({
		[getDateString(date)]: { color: theme['color-primary-300'], textColor: 'white', startingDay: true, endingDay: true}
	});
	
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
				md[getDateString(card.startdate)] = { marked: true, ...md[getDateString(card.startdate)] };
			} else {
				let date = new Date(card.startdate.toString());
				md[getDateString(date)] = { color: theme['color-primary-100'], startingDay: true, ...md[getDateString(date)] };
				for (date.setDate(date.getDate() + 1); date < card.duedate; date.setDate(date.getDate() + 1)) {
					md[getDateString(date)] = { color: theme['color-primary-100'], ...md[getDateString(date)] };
				}
				md[getDateString(date)] = { color: theme['color-primary-100'], endingDay: true, ...md[getDateString(date)] };
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
			[dateString]: { color: theme['color-primary-300'], textColor: 'white', startingDay: true, endingDay: true}, 
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
		return (card.startdate.toDateString() === date.toDateString() &&
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
				minDate={new Date()} 
				onDayPress={day => handleDateChange(day)} 
				markingType={'period'}
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