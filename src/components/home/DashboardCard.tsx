import React from 'react'; 
import { View, Text, TouchableOpacity } from 'react-native';
import { CardModelWithUid } from '../../database/models/cards';
import DashboardCardStyle from '../../styles/components/home/DashboardCard.style';
import themeStyle from '../../styles/theme.style';

// use different type since Card may include 
// other fields eg. color etc

export type DashboardCardType = {
	cardInfo: CardModelWithUid,
    color?: string,
	onPress: (cardInfo: CardModelWithUid) => void
}

const DashboardCard = ({
	cardInfo,  
	onPress}: DashboardCardType, 
): JSX.Element => {
	const { title, description } = cardInfo;
	return (
		<TouchableOpacity 
			style={DashboardCardStyle.container}
			onPress={() => onPress(cardInfo)}
		> 
			<View style={DashboardCardStyle.textContainer}>
				<Text style={DashboardCardStyle.titleText}>
					{title}
				</Text>
				<Text style={DashboardCardStyle.descriptionText}>
					{description}
				</Text>
			</View>
		</TouchableOpacity>
	); 
};

export default DashboardCard;