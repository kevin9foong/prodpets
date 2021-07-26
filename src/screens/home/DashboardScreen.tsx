import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import PetComponent from '../../components/home/PetComponent';
import DashboardCard from '../../components/home/DashboardCard';
import HorizontalItemScroll from '../../components/commons/HorizontalItemScroll';
import DashboardScreenStyles from '../../styles/screens/home/Dashboard.style';
import { CardModelWithUid } from '../../database/models/cards';
import { fetchCards } from '../../redux/actions/cards';
import { DashboardParamList } from '../../navigation/types';
import { useCallback } from 'react';
import { selectAllTagNames } from '../../redux/selectors/tags';
import { changeCardTagFilters } from '../../redux/actions/cardFilter';
import { selectTagFilters } from '../../redux/selectors/cardFilter';
import { selectAllCards } from '../../redux/selectors/cards';
import { overwriteTags } from '../../redux/actions/tags';
import store from '../../redux/store';

type DashboardScreenNavigationProp = StackNavigationProp<
  DashboardParamList,
  'DashboardScreen'
>;

type StateProps = {
  navigation: DashboardScreenNavigationProp;
};

const DashboardScreen: React.FC<StateProps> = ({ navigation }: StateProps) => {
	const dispatch = useAppDispatch();
	const tagNames = useAppSelector(selectAllTagNames);
	const tagFilters = useAppSelector(selectTagFilters);
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
	const allCards = useAppSelector(selectAllCards);

	const [cards, setCards] = useState<CardModelWithUid[]>(allCards);

	useEffect(() => {
		if (tagFilters.length <= 0) {
			setCards(allCards);
		} else {
			const cards: CardModelWithUid[] = allCards.filter(card => card.tags.some(tag => tagFilters.indexOf(tag) >= 0));
			setCards(cards);
		}
		
	}, [tagFilters, allCards]);

	// TODO: solve this issue with fetching cards and updating card list immediately.
	// TODO: fix offline and online integration - currently disabled.
	// useEffect(() => {
	// This currently resets the redux store. 
	// 	dispatch(fetchCards);
	// 	dispatch(changeCardTagFilters([]));
	// 	dispatch(overwriteTags({}));
	// }, []);

	// Card functions
	const onItemPress = (cardInfo: CardModelWithUid) =>
		navigation.navigate('ViewCardModal', { uid: cardInfo.uid });

	const renderItem = ({ item }: { item: CardModelWithUid }) => (
		<DashboardCard onPress={onItemPress} cardInfo={item} />
	);

	// FlatList (Scrollable) functions
	const onRefresh = useCallback(() => {
		setIsRefreshing(true); 
		// load from the online store? 
		setIsRefreshing(false);
	}, []);

	return (
		<View style={DashboardScreenStyles.container}>
			<PetComponent />
			<FlatList
				ListHeaderComponent={
					<HorizontalItemScroll
						onItemPress={(item) => {
							if (tagFilters.includes(item.value)) {
								dispatch(
									changeCardTagFilters(
										tagFilters.filter((tagName) => tagName !== item.value)
									)
								);
							} else {
								dispatch(changeCardTagFilters([item.value, ...tagFilters]));
							}
						}}
						selectedItems={tagFilters.map((tagFilter) => ({
							label: tagFilter,
							value: tagFilter,
						}))}
						items={tagNames.map((tagName) => ({
							label: tagName,
							value: tagName,
						}))}
					/>
				}
				style={DashboardScreenStyles.list}
				data={cards}
				renderItem={renderItem}
				keyExtractor={({ title }, index) => `${title}${index}`}
				refreshControl={
					<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
				}
			/>
		</View>
	);
};

export default DashboardScreen;
