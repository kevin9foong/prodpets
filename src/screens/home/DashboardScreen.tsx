import React, { useEffect, useState } from 'react'; 
import { View, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';

import DashboardCard from '../../components/home/DashboardCard';
import DashboardScreenStyles from '../../styles/screens/home/Dashboard.style';
import { selectUserUid } from '../../redux/slices/userSlice';
import { CardModelWithUid, fetchCards } from '../../database/models/cards';
import { DashboardParamList } from '../../navigation/types';
import { useCallback } from 'react';

type DashboardScreenNavigationProp = StackNavigationProp<
	DashboardParamList, 'DashboardScreen'>; 

type StateProps = {
	navigation: DashboardScreenNavigationProp
}

const DashboardScreen: React.FC<StateProps> = ({navigation}: StateProps) => {
	const userUid = useSelector(selectUserUid);
	const [cardData, setCardData] = useState<CardModelWithUid[]>([]);
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

	// TODO: solve this issue with fetching cards and updating card list immediately. 
	useEffect(() => {
		// safe to typecast as userUid has to exist to access this page.
		fetchCards(userUid as string).then(
			cards => setCardData(cards as CardModelWithUid[])
		);
	// only fetch the first time!
	}, []);

	// Card functions
	const onItemPress = (cardInfo: CardModelWithUid) => navigation.navigate('UpdateCardModal', cardInfo);

	const renderItem = ({item}: {item: CardModelWithUid}) => <DashboardCard
		onPress={onItemPress}
		cardInfo={item} />;

	// FlatList (Scrollable) functions
	const onRefresh = useCallback(() => {
		setIsRefreshing(true); 
		fetchCards(userUid as string).then(
			cards=> setCardData(cards as CardModelWithUid[])
		).then(() => setIsRefreshing(false));
	}, []);

	return (
		<View
			style={DashboardScreenStyles.container}>
			<FlatList
				style={DashboardScreenStyles.list}
				data={cardData}
				renderItem={renderItem}
				keyExtractor={({title}, index) => `${title}${index}`}
				// bounces={false}
				refreshControl={ 
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={onRefresh}
					/> 
				}
			/>
		</View>
	);
};

export default DashboardScreen; 