import React from 'react'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CardForm, { formType } from '../../components/home/CardForm';
import { CardModel, CardModelWithUid } from '../../database/models/cards';

type StateProps = { 
    onSaveSubmit: (data: CardModel) => void, 
	onDeleteSubmit?: () => void, 
	navigation: any, 
	cardInfo?: CardModelWithUid, 
	formType: formType
}

const CardModal = ({ onSaveSubmit, onDeleteSubmit, cardInfo, navigation, formType }: StateProps): JSX.Element => {
	return (
		<KeyboardAwareScrollView
			style={{flex: 1}}>
			<CardForm 
				formType={formType}
				navigation={navigation}
				defaultValues={cardInfo}
				onDeleteSubmit={onDeleteSubmit}
				onSaveSubmit={onSaveSubmit}/> 
		</KeyboardAwareScrollView>
	);
};

export default CardModal;