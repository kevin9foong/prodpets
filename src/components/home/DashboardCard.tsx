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
	color = themeStyle['color-primary-200'],
	onPress}: DashboardCardType, 
): JSX.Element => {
	const { title, description } = cardInfo;
	return (
		<TouchableOpacity 
			style={DashboardCardStyle.container}
			onPress={() => onPress(cardInfo)}
		> 
			<View style={DashboardCardStyle.leftContainer} />
			<View style={DashboardCardStyle.middleContainer}>
				<Text>{title}</Text>
				<Text>{description}</Text>
			</View>
			<View style={DashboardCardStyle.rightContainer}>
			</View>
		</TouchableOpacity>
	);
};

export default DashboardCard;