import React from 'react'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CardForm, { formType } from '../../components/home/CardForm';
import ViewCard from '../home/ViewCard';
import { CardModelWithUid } from '../../database/models/cards';

type StateProps = { 
	navigation: any, 
	cardInfo?: CardModelWithUid, 
	formType: formType
}

const CardModal = ({ cardInfo, navigation, formType }: StateProps): JSX.Element => {
	return (
		<KeyboardAwareScrollView
			style={{flex: 1}}>
			{formType === 'view' 
				? <ViewCard 
					navigation={navigation} 
					cardInfo={cardInfo} />
			// for create and edit
				: <CardForm 
					formType={formType}
					navigation={navigation}
					defaultValues={cardInfo} 
				/>
			}
		</KeyboardAwareScrollView>
	);
};

export default CardModal;