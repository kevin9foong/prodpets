import React from 'react'; 
import {
	View
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import CardForm from '../../components/home/CardForm';
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
		<View
			style={{
				flex: 1
			}}>
			<CardForm 
				defaultValues={cardInfo}
				onFormSubmit={onFormSubmit}/> 
		</View> 
	);

};

export default CreateCardModal;