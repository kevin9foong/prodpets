import React from 'react'; 
import { ScrollView } from 'react-native';
import CardForm from '../../components/home/CardForm';
import { CardModel, CardModelWithUid } from '../../database/models/cards';
import CardModalStyle from '../../styles/components/home/CardModal.style';

type StateProps = { 
    onFormSubmit: (data: CardModel) => void,
	cardInfo?: CardModelWithUid 
}

const CardModal = ({ onFormSubmit, cardInfo }: StateProps): JSX.Element => {
	return (
		<ScrollView	
			bounces={false}
			contentContainerStyle={CardModalStyle.scrollableContainer}	
		>	
			<CardForm 
				defaultValues={cardInfo}
				onFormSubmit={onFormSubmit}/> 
		</ScrollView>
	);
};

export default CardModal;