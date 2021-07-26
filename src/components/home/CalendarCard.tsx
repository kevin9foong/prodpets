import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CardModelWithUid } from '../../database/models/cards';
import CalendarCardStyles from '../../styles/components/home/CalendarCard.style';
import { getTimeRange } from '../../util/timeformatter';

type CalendarCardProps = {
  cardInfo: CardModelWithUid;
  onCardClick: (a: CardModelWithUid) => void;
};

const CalendarCard = ({
	cardInfo,
	onCardClick,
}: CalendarCardProps): JSX.Element => {
	return (
		<TouchableOpacity onPress={() => onCardClick(cardInfo)}>
			<View style={CalendarCardStyles.container}>
				<Text style={{ paddingBottom: 5, color: 'white' }}>
					{cardInfo.title}
				</Text>
				<Text style={{ color: 'white' }}>
					{getTimeRange(
						new Date(cardInfo.startdate),
						new Date(cardInfo.duedate)
					)}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default CalendarCard;
