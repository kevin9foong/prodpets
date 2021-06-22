import React from 'react'; 
import {
	View
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import CardForm from '../../components/home/CardForm';
import { HomeStackParamList } from '../../navigation/types';
import { CardModel, saveCard } from '../../database/models/cards';

type ScreenProps = StackScreenProps<HomeStackParamList, 'CreateCardModal'>;

const CreateCardModal: React.FC<ScreenProps> = ({ navigation }: ScreenProps) => {
	const onFormSubmit = (userUid:string, data: CardModel) => {
		saveCard(userUid, data); 
		navigation.goBack();
	};

	return (
		<View
			style={{
				flex: 1
			}}>
			<CardForm 
				onFormSubmit={onFormSubmit}/> 
		</View> 
	);

};

export default CreateCardModal;