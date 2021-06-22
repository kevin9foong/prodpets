import React from 'react'; 
import { ScrollView, View } from 'react-native';
import CardForm from '../../components/home/CardForm';
import { CardModel } from '../../database/models/cards';
import CardModalStyle from '../../styles/components/home/CardModal.style';
import themeStyle from '../../styles/theme.style';

type StateProps = { 
    onFormSubmit: (userUid:string, data: CardModel) => void
}

const CardModal = ({ onFormSubmit }: StateProps): JSX.Element => {
	return (
		<ScrollView	
			bounces={false}
			contentContainerStyle={CardModalStyle.scrollableContainer}	
		>	
			<CardForm 
				onFormSubmit={onFormSubmit}/> 
		</ScrollView>
	);
};

export default CardModal;