import React from 'react'; 
import { View, Text, TouchableOpacity } from 'react-native';
import { CardModel } from '../../database/models/cards';
import DashboardCardStyle from '../../styles/components/home/DashboardCard.style';
import themeStyle from '../../styles/theme.style';

// use different type since Card may include 
// other fields eg. color etc

export type DashboardCardType = {
    title: string, 
    description: string,
    color?: string,
	onPress: (cardInfo: CardModel) => void
}

const DashboardCard = ({
	title, 
	description, 
	color = themeStyle['color-primary-200'],
	onPress}: DashboardCardType, 
): JSX.Element => {
	return (
		<TouchableOpacity 
			style={DashboardCardStyle.container}
			onPress={() => onPress({title, description})}
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