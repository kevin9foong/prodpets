import React from 'react';
import { View, FlatList } from 'react-native';
import { useAppSelector } from '../../redux/hooks';
import { selectAllCards } from '../../redux/selectors/cards';
import DashboardCard from './DashboardCard';
import { CardModelWithUid } from '../../database/models/cards';

type GameScreenModalProps = {
  navigation: any;
};

const GameCardSelectModal = ({ navigation }: GameScreenModalProps) => {

	const cards: CardModelWithUid[] = useAppSelector(selectAllCards);

	const keyExtractor = (item: CardModelWithUid, index: number) =>
		index.toString();

	const renderItem = ({ item }: { item: CardModelWithUid }) => (
		<DashboardCard
			onPress={() => {
				navigation.navigate('Game', { uid: item.uid } );
			}}
			cardInfo={item}
			key={item.uid}
		/>
	);

	return (
		<View>
			<FlatList
				data={cards}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
			/>
		</View>
	);
};

export default GameCardSelectModal;
