import React from 'react'; 
import { View, Text, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
// import { DashboardCard } from '../../components/home/DashboardCard';
import CalendarCard from '../../components/home/CalendarCard';

const CalendarScreen: React.FC = ({navigation}: any) => {

	const [date, setDate] = React.useState(new Date());

	const getDayText = (num: Number): String => {
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
			case 7:
				return 'Sun';
			default:
				return "";
		}
	}

	const renderItem = (item: any) => <CalendarCard info={item}/>

	const calendarData = [
		{
			title: 'Gym',
			time: '4pm - 6pm',
		},
		{
			title: 'Work',
			time: '6pm - 8pm',
		}
	];

	return (
		<View>
			{/* on long press, open the create card modal with date fields filled in */}
			<Calendar 
				style={{marginBottom: 30}} 
				enableSwipeMonths={true} 
				minDate={new Date()} 
				onDayPress={day => setDate(new Date(day.dateString))} 
				onDayLongPress={() => navigation.navigate('CreateCardModal')} 
			/>
			<View style={{marginLeft: 15, display: 'flex', flexDirection: 'row', width: '100%'}}>
				<View style={{marginRight: 15}}>
					<Text style={{fontSize: 20}}>{date.getDate()}</Text>
					<Text style={{fontSize: 20}}>{getDayText(date.getDay())}</Text>
				</View>
				<FlatList
					data={calendarData}
					renderItem={renderItem}
					keyExtractor={({title, time}, index) => `${title}${index}`} 
				/>
			</View>
		</View>
	);
};

export default CalendarScreen; 