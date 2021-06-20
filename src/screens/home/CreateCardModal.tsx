import React from 'react'; 
import {
	View
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import AddCardForm from '../../components/home/CardForm';
import { HomeStackParamList } from '../../navigation/types';

type ScreenProps = StackScreenProps<HomeStackParamList, 'CreateCardModal'>;

const CreateCardModal: React.FC<ScreenProps> = ({navigation}: ScreenProps) => {
	const onFormSubmit = () => {
		navigation.goBack();
	};

	return (
		<View
			style={{
				flex: 1
			}}>
			<AddCardForm onFormSubmit={onFormSubmit}/> 
		</View> 
	);

};

export default CreateCardModal;