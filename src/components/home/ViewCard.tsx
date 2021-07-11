import React from 'react'; 
import { View, Button } from 'react-native'; 
import { CardModelWithUid } from '../../database/models/cards';

type UpdateCardModalRightHeaderProps = {
	onEditSubmit: () => void,
	onDeleteSubmit: () => void, 
}

const ViewCardModalRightHeader = ({onDeleteSubmit, onEditSubmit}: UpdateCardModalRightHeaderProps) => {
	return <View style={{
		display: 'flex', 
		flexDirection: 'row', 
		paddingHorizontal: 20
	}}>
		<View style={{
			marginRight: 3
		}}>
			<Button 
				accessibilityLabel='Delete Card'
				title='Delete' 
				onPress={onDeleteSubmit}/> 
		</View>
		<View style={{
			marginLeft: 3
		}}>
			<Button 
				accessibilityLabel='Edit Card'
				title='Edit' 
				onPress={onEditSubmit}/> 
		</View> 
	</View>;
};

type StateProps = { 
	navigation: any, 
    // TODO: fix these typings
	cardInfo?: CardModelWithUid, 
    onDeleteSubmit?: () => void, 
    onEditSubmit: () => void
}

const ViewCard = ({ onDeleteSubmit, onEditSubmit, navigation, cardInfo }: StateProps) => {

	React.useLayoutEffect(() => {
		navigation.setOptions({
			// eslint-disable-next-line react/display-name
			headerRight: () => <ViewCardModalRightHeader 
				// TODO: fix this assertion 
				onDeleteSubmit={onDeleteSubmit!} 
				onEditSubmit={onEditSubmit} />
		});
	});
    
	return <></>;
};

export default ViewCard; 