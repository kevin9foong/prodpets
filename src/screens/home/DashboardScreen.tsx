import React, { useEffect, useState } from 'react'; 
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import DashboardCard from '../../components/home/DashboardCard';
import DashboardScreenStyles from '../../styles/screens/home/Dashboard.style';
import { selectUserUid } from '../../redux/slices/userSlice';
import { CardModel, fetchCards } from '../../database/models/cards';

const DashboardScreen: React.FC = () => {
	const userUid = useSelector(selectUserUid);
	const [cardData, setCardData] = useState<CardModel[]>([]);
	useEffect(() => {
		// safe to typecast as userUid has to exist to access this page.
		fetchCards(userUid as string).then(
			cards=> setCardData(cards as CardModel[])
		);
	});

	const renderItem = ({item}) => <DashboardCard
		title={item.title}
		description={item.description} />;

	return (
		<View
			style={DashboardScreenStyles.container}>
			<FlatList
				style={DashboardScreenStyles.list}
				data={cardData}
				renderItem={renderItem}
				keyExtractor={({title}, index) => `${title}${index}`}
				// bounces={false}
			/>
		</View>
	);
};

export default DashboardScreen; 