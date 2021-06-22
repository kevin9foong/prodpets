import React, { useEffect, useState } from 'react'; 
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import DashboardCard from '../../components/home/DashboardCard';
import DashboardScreenStyles from '../../styles/screens/home/Dashboard.style';
import { selectUserUid } from '../../redux/slices/userSlice';
import { CardModel, CardModelWithUid, fetchCards } from '../../database/models/cards';
import { DashboardParamList } from '../../navigation/types';

type DashboardScreenNavigationProp = StackNavigationProp<
	DashboardParamList, 'DashboardScreen'>; 

type StateProps = {
	navigation: DashboardScreenNavigationProp
}

const DashboardScreen: React.FC<StateProps> = ({navigation}: StateProps) => {
	const userUid = useSelector(selectUserUid);
	const [cardData, setCardData] = useState<CardModel[]>([]);

	// TODO: solve this issue with fetching cards and updating card list immediately. 
	useEffect(() => {
		// safe to typecast as userUid has to exist to access this page.
		fetchCards(userUid as string).then(
			cards=> setCardData(cards as CardModelWithUid[])
		);
	}, []);

	const onItemPress = (cardInfo: CardModelWithUid) => navigation.navigate('UpdateCardModal', cardInfo);

	const renderItem = ({item}) => <DashboardCard
		onPress={onItemPress}
		uid={item.uid}
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