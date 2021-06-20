import React from 'react'; 
import { View, Text } from 'react-native';
import DashboardCardStyle from '../../styles/components/home/DashboardCard.style';
import themeStyle from '../../styles/theme.style';

// use different type since Card may include 
// other fields eg. color etc

export type DashboardCardType = {
    title: string, 
    description: string,
    color?: string
}

const DashboardCard = ({
	title, 
	description, 
	color = themeStyle['color-primary-200']}: DashboardCardType
): JSX.Element => {
	return (
		<View style={DashboardCardStyle.container} > 
			<View style={DashboardCardStyle.leftContainer} />
			<View style={DashboardCardStyle.middleContainer}>
				<Text>{title}</Text>
				<Text>{description}</Text>
			</View>
			<View style={DashboardCardStyle.rightContainer}>
			</View>
		</View>
	);
};

export default DashboardCard;