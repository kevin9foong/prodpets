import React from 'react'; 
import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

import CardModal from '../../components/home/CardModal';
import { HomeStackParamList } from '../../navigation/types';
import { CardModel, CardModelWithUid } from '../../database/models/cards';
import { updateCard } from '../../redux/actions/cards';

type ScreenProps = StackScreenProps<HomeStackParamList, 'UpdateCardModal'>;

const UpdateCardModal: React.FC<ScreenProps> = ({ route, navigation }: ScreenProps) => {
	const dispatch = useDispatch();
	const cardInfo: CardModelWithUid | undefined = route.params; 

	const onFormSubmit = (data: CardModel) => {
		if (cardInfo.uid) {
			dispatch(updateCard({uid: cardInfo.uid, ...data}));
		}
		navigation.goBack();
	};

	return (
		<CardModal cardInfo={cardInfo} onFormSubmit={onFormSubmit} />
	);

};

export default UpdateCardModal;