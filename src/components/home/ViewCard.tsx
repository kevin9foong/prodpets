import React from 'react'; 
import { Platform } from 'react-native';
import { View, Button, Text } from 'react-native'; 
import { MarkdownView } from 'react-native-markdown-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checklist from '../Checklist';
import { ChecklistItem } from '../Checklist';
import AndroidDateTimePicker from '../AndroidDateTimePicker';
import { useDispatch } from 'react-redux';

import { CardModelWithUid } from '../../database/models/cards';
import { deleteCard } from '../../redux/actions/cards';

import CreateCardModalStyle from '../../styles/components/home/CardForm.style';

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
	cardInfo: CardModelWithUid
}

const ViewCard = ({ navigation, cardInfo }: StateProps): JSX.Element => {
	const dispatch = useDispatch(); 

	const onDeleteSubmit = () => {
		if (cardInfo?.uid) {
			dispatch(deleteCard(cardInfo.uid)); 
		}
		navigation.goBack();
	};

	const onEditSubmit = () => {
		navigation.navigate('UpdateCardModal', {
			...cardInfo
		});
	};

	React.useLayoutEffect(() => {
		navigation.setOptions({
			// eslint-disable-next-line react/display-name
			headerRight: () => <ViewCardModalRightHeader 
				// TODO: fix this assertion 
				onDeleteSubmit={onDeleteSubmit} 
				onEditSubmit={onEditSubmit} />
		});
	});
    
	return (<View
		style={CreateCardModalStyle.container}
	>
		<View 
			style={CreateCardModalStyle.topContainer}
		>

			<View 
				style={CreateCardModalStyle.titleContainer}
			>
				<Text
					style={CreateCardModalStyle.inputLabel}
				>
								Title
				</Text>
				<Text>
					{cardInfo.title}
				</Text>
			</View>
			<View 
				style={CreateCardModalStyle.descriptionContainer}
			>
				<Text
					style={CreateCardModalStyle.inputLabel}>
								Description
				</Text>
				{/* TODO: Fix or replace Markdown view. */}
				<MarkdownView>
					{cardInfo.description ?? ''}
				</MarkdownView>
			</View>
		</View>
		<View
			style={CreateCardModalStyle.bottomContainer}
		>	
			<View style={CreateCardModalStyle.fieldContainer}> 
				<Text
					style={CreateCardModalStyle.inputLabelDark}>
						Checklist
				</Text>
				{/* TODO: replace with view mode checklist */}
				<Checklist 
					onChange={(checklistItems: ChecklistItem[]) => {
						{}
					}}
					data={cardInfo.checklistItems} />
			</View>
			<View 
				style={CreateCardModalStyle.fieldContainer}
			>
				<Text
					style={CreateCardModalStyle.inputLabelDark}>
						Start Date
				</Text>
				{
					Platform.OS === 'ios'
						? <DateTimePicker 
							style={CreateCardModalStyle.dateTimeInput}
							value={new Date(cardInfo.startdate)}
							mode={'datetime'}
							display='default'
							onChange={(event, date) => {}}
						/>
						: <AndroidDateTimePicker 
							value={new Date(cardInfo.startdate)} 
							onChange={() => {}}
						/>
				}
			</View>
			<View 
				style={CreateCardModalStyle.fieldContainer}
			>
				<Text
					style={CreateCardModalStyle.inputLabelDark}>
						Due Date
				</Text>
				{
					Platform.OS === 'ios'
						? <DateTimePicker 
							style={CreateCardModalStyle.dateTimeInput}
							value={new Date(cardInfo.duedate)}
							mode={'datetime'}
							display='default'
							onChange={(event, date) => {}}
						/>
						: <AndroidDateTimePicker 
							value={new Date(cardInfo.duedate)} 
							onChange={() => {}}
						/>
				}
			</View>
		</View>
	</View> );
};

export default ViewCard; 