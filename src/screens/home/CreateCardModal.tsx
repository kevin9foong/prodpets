import React from 'react'; 
import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

import { generateUuid } from '../../util/uuidGenerator';
import { addCard } from '../../redux/actions/cards';
import { HomeStackParamList } from '../../navigation/types';
import { CardModel } from '../../database/models/cards';
import CardModal from '../../components/home/CardModal';

type ScreenProps = StackScreenProps<HomeStackParamList, 'CreateCardModal'>;

const CreateCardModal: React.FC<ScreenProps> = ({ navigation }: ScreenProps) => {
	const dispatch = useDispatch(); 

	const onFormSubmit = (data: CardModel) => {
		dispatch(addCard(generateUuid(), data)); 
		// saveCard(userUid, data); 
		navigation.goBack();
	};

	return (
		<CardModal onFormSubmit={onFormSubmit} />
	);

};

export default CreateCardModal;