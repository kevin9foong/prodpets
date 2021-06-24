import React from 'react'; 
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
// import { DashboardCard } from '../../components/home/DashboardCard';
import CalendarCard from '../../components/home/CalendarCard';

const CalendarScreen: React.FC = ({navigation}: any) => {

	const [date, setDate] = React.useState(new Date());

	const getDayText = (num: Number): String => {
		switch (num) {
			case 0:
				return 'Mon';
			case 1: 
				return 'Tue';
			case 2:
				return 'Wed';
			case 3:
				return 'Thu';
			case 4:
				return 'Fri';
			case 5:
				return 'Sat';
			case 6:
				return 'Sun';
			default:
				return "";
		}
	}

	return (
		<View>
			{/* on long press, open the create card modal with date fields filled in */}
			<Calendar style={{marginBottom: 30}} enableSwipeMonths={true} minDate={new Date()} onDayPress={day => setDate(new Date(day.dateString))} onDayLongPress={() => navigation.navigate('CreateCardModal')} />
			<View style={{marginLeft: 15, display: 'flex', flexDirection: 'row', width: '100%'}}>
				<View style={{marginRight: 15}}>
					<Text style={{fontSize: 20}}>{date.getDate()}</Text>
					<Text style={{fontSize: 20}}>{getDayText(date.getDay())}</Text>
				</View>
				<CalendarCard title={"Gym"} time={'4pm - 6pm'} />
			</View>
		</View>
	);
};

export default CalendarScreen; 