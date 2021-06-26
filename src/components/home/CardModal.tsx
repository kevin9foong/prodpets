import React from 'react'; 
import { ScrollView } from 'react-native';
import CardForm, { formType } from '../../components/home/CardForm';
import { CardModel, CardModelWithUid } from '../../database/models/cards';
import CardModalStyle from '../../styles/components/home/CardModal.style';

type StateProps = { 
    onSaveSubmit: (data: CardModel) => void, 
	onDeleteSubmit?: () => void, 
	navigation: any, 
	cardInfo?: CardModelWithUid, 
	formType: formType
}

const CardModal = ({ onSaveSubmit, onDeleteSubmit, cardInfo, navigation, formType }: StateProps): JSX.Element => {
	return (
		<ScrollView	
			bounces={false}
			contentContainerStyle={CardModalStyle.scrollableContainer}	
		>	
			<CardForm 
				formType={formType}
				navigation={navigation}
				defaultValues={cardInfo}
				onDeleteSubmit={onDeleteSubmit}
				onSaveSubmit={onSaveSubmit}/> 
		</ScrollView>
	);
};

export default CardModal;