import React from 'react'; 
import { View, Text, TouchableOpacity } from 'react-native';
import { CardModelWithUid } from '../../database/models/cards';
import CalendarCardStyles from '../../styles/components/home/CalendarCard.style';
import { getTimeRange } from '../../util/timeformatter';

type CalendarCardProps = {
  cardInfo: CardModelWithUid, 
  clickHandler: (a: CardModelWithUid) => void,
}

const CalendarCard = ({cardInfo, clickHandler}: CalendarCardProps): React.ReactElement => {

	return (
		<TouchableOpacity
			onPress={() => clickHandler(cardInfo)}
		>
			<View style={CalendarCardStyles.container}>
				<Text style={{paddingBottom: 5, color: 'white'}}>{ cardInfo.title }</Text>
				<Text style={{color: 'white'}}>{ getTimeRange(cardInfo.startdate, cardInfo.duedate) }</Text>
			</View>
		</TouchableOpacity>
	);
};

export default CalendarCard;