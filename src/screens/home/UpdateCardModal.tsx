import React from 'react'; 
import { StackScreenProps } from '@react-navigation/stack';

import CardModal from '../../components/home/CardModal';
import { HomeStackParamList } from '../../navigation/types';
import { CardModel, CardModelWithUid } from '../../database/models/cards';
import { updateCard } from '../../database/models/cards';

type ScreenProps = StackScreenProps<HomeStackParamList, 'UpdateCardModal'>;

const CreateCardModal: React.FC<ScreenProps> = ({ route, navigation }: ScreenProps) => {
	const cardInfo: CardModelWithUid | undefined = route.params; 

	const onFormSubmit = (userUid: string, data: CardModel) => {
		if (cardInfo && (cardInfo as CardModelWithUid).uid) {
			updateCard(userUid, (cardInfo as CardModelWithUid).uid , data); 
		}
		navigation.goBack();
	};

	return (
		<CardModal onFormSubmit={onFormSubmit} />
	);

};

export default CreateCardModal;