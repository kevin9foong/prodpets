import React, { useEffect, useState } from 'react'; 
import { View, FlatList, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';

import DashboardCard from '../../components/home/DashboardCard';
import DashboardScreenStyles from '../../styles/screens/home/Dashboard.style';
import { CardModelWithUid } from '../../database/models/cards';
import { fetchCards } from '../../redux/actions/cards';
import { selectCards } from '../../redux/selectors/cards';
import { DashboardParamList } from '../../navigation/types';
import { useCallback } from 'react';

type DashboardScreenNavigationProp = StackNavigationProp<
	DashboardParamList, 'DashboardScreen'>; 

type StateProps = {
	navigation: DashboardScreenNavigationProp
}

const DashboardScreen: React.FC<StateProps> = ({navigation}: StateProps) => {
	// const [cardData, setCardData] = useState<CardModelWithUid[]>([]);
	const cards = useSelector(selectCards); 
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

	const dispatch = useDispatch();

	// TODO: solve this issue with fetching cards and updating card list immediately. 
	// TODO: fix offline and online integration - currently disabled.
	useEffect(() => {
		// safe to typecast as userUid has to exist to access this page.
		// only fetch the first time!
		// dispatch(fetchCards); 
	}, []);

	// Card functions
	const onItemPress = (cardInfo: CardModelWithUid) => navigation.navigate('UpdateCardModal', cardInfo);

	const renderItem = ({item}: {item: CardModelWithUid}) => <DashboardCard
		onPress={onItemPress}
		cardInfo={item} />;

	// FlatList (Scrollable) functions
	const onRefresh = useCallback(() => {
		setIsRefreshing(true); 
		// executed synchronously? 
		dispatch(fetchCards);
		setIsRefreshing(false);
	}, []);

	return (
		<View
			style={DashboardScreenStyles.container}>
			<FlatList
				style={DashboardScreenStyles.list}
				data={cards}
				renderItem={renderItem}
				keyExtractor={({title}, index) => `${title}${index}`}
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