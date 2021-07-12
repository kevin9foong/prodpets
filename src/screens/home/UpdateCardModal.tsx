import React from 'react'; 
import { StackScreenProps } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import CardModal from '../../components/home/CardModal';
import { CardUid, HomeStackParamList } from '../../navigation/types';
import { selectCardByUID } from '../../redux/selectors/cards';

type ScreenProps = StackScreenProps<HomeStackParamList, 'UpdateCardModal'>;

const UpdateCardModal: React.FC<ScreenProps> = ({ route, navigation }: ScreenProps) => {
	const cardUid: CardUid = route.params; 

	const cardInfo = useSelector(selectCardByUID(cardUid.uid));

	return (
		<CardModal 
			formType='edit' 
			cardInfo={cardInfo} 
			navigation={navigation} />
	);

};

export default UpdateCardModal;