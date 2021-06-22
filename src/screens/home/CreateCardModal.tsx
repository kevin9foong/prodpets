import React from 'react'; 
import { StackScreenProps } from '@react-navigation/stack';

import { HomeStackParamList } from '../../navigation/types';
import { CardModel, saveCard } from '../../database/models/cards';
import CardModal from '../../components/home/CardModal';

type ScreenProps = StackScreenProps<HomeStackParamList, 'CreateCardModal'>;

const CreateCardModal: React.FC<ScreenProps> = ({ navigation }: ScreenProps) => {
	const onFormSubmit = (userUid:string, data: CardModel) => {
		saveCard(userUid, data); 
		navigation.goBack();
	};

	return (
		<CardModal onFormSubmit={onFormSubmit} />
	);

};

export default CreateCardModal;