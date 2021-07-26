import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CardModelWithUid } from '../../database/models/cards';
import DashboardCardStyle from '../../styles/components/home/DashboardCard.style';
import { getTimeRange } from '../../util/timeformatter';

// use different type since Card may include
// other fields eg. color etc

export type DashboardCardType = {
  cardInfo: CardModelWithUid;
  color?: string;
  onPress: (cardInfo: CardModelWithUid) => void;
};

const DashboardCard = ({
	cardInfo,
	onPress,
}: DashboardCardType): JSX.Element => {
	const { title, description, startdate, duedate } = cardInfo;
	return (
		<TouchableOpacity
			style={DashboardCardStyle.container}
			onPress={() => onPress(cardInfo)}
		>
			{/* TODO: implement coloring when tags are added */}
			<View
				style={{
					...DashboardCardStyle.coloredIndicator,
					backgroundColor: false ? null : '#000',
				}}
			></View>
			<View style={DashboardCardStyle.textContainer}>
				<Text style={DashboardCardStyle.titleText}>{title}</Text>
				<Text style={DashboardCardStyle.descriptionText}>{description}</Text>
				<Text style={DashboardCardStyle.timingText}>
					{getTimeRange(new Date(startdate), new Date(duedate))}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default DashboardCard;
