import React from 'react'; 
import { StackScreenProps } from '@react-navigation/stack';

import CardModal from '../../components/home/CardModal';
import { HomeStackParamList } from '../../navigation/types';
import { CardModelWithUid } from '../../database/models/cards';

type ScreenProps = StackScreenProps<HomeStackParamList, 'ViewCardModal'>;

const ViewCardModal: React.FC<ScreenProps> = ({ route, navigation }: ScreenProps) => {
	const cardInfo: CardModelWithUid | undefined = route.params; 

	return (
		<CardModal 
			formType='view' 
			cardInfo={cardInfo} 
			navigation={navigation} 
		/>
	); 
};

export default ViewCardModal;