import React from 'react'; 
import { View, Text, TouchableOpacity } from 'react-native';
import { CardModelWithUid } from '../../database/models/cards';
import CalendarCardStyles from '../../styles/components/home/CalendarCard.style';
import { getTimeRange } from '../../util/dateFormat';

type CalendarCardProps = {
  info: {
    item: CardModelWithUid,
  },
  clickHandler: (a: CardModelWithUid) => void,
}

const CalendarCard = ({info, clickHandler}: CalendarCardProps): React.ReactElement => {

	const item = info.item;

	return (
		<TouchableOpacity
			onPress={() => clickHandler(item)}
		>
			<View style={CalendarCardStyles.container}>
				<Text style={{paddingBottom: 5, color: 'white'}}>{ item.title }</Text>
				<Text style={{color: 'white'}}>{ getTimeRange(item) }</Text>
			</View>
		</TouchableOpacity>
	);
};

export default CalendarCard;