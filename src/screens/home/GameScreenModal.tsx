import React from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { selectAllCards } from '../../redux/selectors/cards';
import DashboardCard from '../../components/home/DashboardCard';
import { CardModelWithUid } from '../../database/models/cards';

type GameScreenModalProps = {
  route: any,
  navigation: any,
};

const GameScreenModal = ({ route, navigation }: GameScreenModalProps) => {

  const {onPressCard} = route.params;

  const cards: CardModelWithUid[] = useSelector(selectAllCards)

  const keyExtractor = (item: CardModelWithUid, index: number) => index.toString();

  const renderItem = ({item}: {item: CardModelWithUid}) => <DashboardCard
    onPress={() => {onPressCard(item, navigation)}}
		cardInfo={item} 
    key={item.uid} />

  return (
    <View>
      <FlatList data={cards} renderItem={renderItem} keyExtractor={keyExtractor} />
    </View>
  )
}

export default GameScreenModal;