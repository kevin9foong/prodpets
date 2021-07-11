import React from 'react'; 
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/types';
import CardModal from '../../components/home/CardModal';

type ScreenProps = StackScreenProps<HomeStackParamList, 'CreateCardModal'>;

const CreateCardModal: React.FC<ScreenProps> = ({ navigation }: ScreenProps) => {
	return (
		<CardModal formType='create' navigation={navigation} />
	);

};

export default CreateCardModal;