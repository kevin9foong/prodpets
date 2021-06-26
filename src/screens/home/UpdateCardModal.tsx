import React from 'react'; 
import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

import CardModal from '../../components/home/CardModal';
import { HomeStackParamList } from '../../navigation/types';
import { CardModel, CardModelWithUid } from '../../database/models/cards';
import { updateCard, deleteCard } from '../../redux/actions/cards';

type ScreenProps = StackScreenProps<HomeStackParamList, 'UpdateCardModal'>;

const UpdateCardModal: React.FC<ScreenProps> = ({ route, navigation }: ScreenProps) => {
	const dispatch = useDispatch();
	const cardInfo: CardModelWithUid | undefined = route.params; 

	const onDeleteSubmit = () => {
		if (cardInfo?.uid) {
			dispatch(deleteCard(cardInfo.uid)); 
		}
		navigation.goBack();
	};

	const onSaveSubmit = (data: CardModel) => {
		if (cardInfo.uid) {
			dispatch(updateCard({uid: cardInfo.uid, ...data}));
		}
		navigation.goBack();
	};

	return (
		<CardModal 
			formType='edit' 
			cardInfo={cardInfo} 
			navigation={navigation} 
			onDeleteSubmit={onDeleteSubmit}
			onSaveSubmit={onSaveSubmit} />
	);

};

export default UpdateCardModal;