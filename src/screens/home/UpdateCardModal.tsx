import React from 'react'; 
import {
	View
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import CardForm from '../../components/home/CardForm';
import { HomeStackParamList } from '../../navigation/types';
import { CardModel } from '../../database/models/cards';

type ScreenProps = StackScreenProps<HomeStackParamList, 'UpdateCardModal'>;

const CreateCardModal: React.FC<ScreenProps> = ({ route, navigation }: ScreenProps) => {
	const onFormSubmit = (userUid: string, data: CardModel) => {
		// updateCard(); 
		navigation.goBack();
	};

	const cardInfo: CardModel | undefined = route.params; 

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