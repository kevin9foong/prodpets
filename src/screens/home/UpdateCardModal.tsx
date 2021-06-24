import React from 'react'; 
import { StackScreenProps } from '@react-navigation/stack';

import CardModal from '../../components/home/CardModal';
import { HomeStackParamList } from '../../navigation/types';
import { CardModel, CardModelWithUid } from '../../database/models/cards';
import { updateCard } from '../../database/models/cards';

type ScreenProps = StackScreenProps<HomeStackParamList, 'UpdateCardModal'>;

const UpdateCardModal: React.FC<ScreenProps> = ({ route, navigation }: ScreenProps) => {
	const cardInfo: CardModelWithUid = route.params; 

	const onFormSubmit = (userUid: string, data: CardModel) => {
		if (cardInfo && (cardInfo as CardModelWithUid).uid) {
			updateCard(userUid, (cardInfo as CardModelWithUid).uid , data); 
		}
		navigation.goBack();
	};

	return (
		<CardModal cardInfo={cardInfo} onFormSubmit={onFormSubmit} />
	);

};

export default UpdateCardModal;