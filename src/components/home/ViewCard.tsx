import React from 'react'; 
import { Platform } from 'react-native';
import { View, Button, Text } from 'react-native'; 
import { MarkdownView } from 'react-native-markdown-view';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checklist, { ChecklistItem } from '../commons/Checklist';
import AndroidDateTimePicker from '../commons/AndroidDateTimePicker';
import { useDispatch } from 'react-redux';

import { CardModelWithUid } from '../../database/models/cards';
import { updateCard } from '../../redux/actions/cards';

import CreateCardModalStyle from '../../styles/components/home/CardForm.style';
import { useEffect } from 'react';

type ViewCardModalRightHeaderProps = {
	onEditSubmit: () => void,
}

const ViewCardModalRightHeader = ({ onEditSubmit }: ViewCardModalRightHeaderProps) => {
	return <View
		style={{ 
			paddingHorizontal: 20
		}}>
		<Button 
			accessibilityLabel='Edit Card'
			title='Edit' 
			onPress={onEditSubmit}/>
	</View>; 
};

type StateProps = { 
	navigation: any, 
	cardInfo: CardModelWithUid
}

const ViewCard = ({ navigation, cardInfo }: StateProps): JSX.Element => {
	const dispatch = useDispatch(); 
	const { control, setValue } = useForm(); 

	useEffect(() => {
		setValue('checklistItems', cardInfo.checklistItems);
	}, [cardInfo]);

	const onEditSubmit = () => {
		navigation.navigate('UpdateCardModal', {uid: cardInfo.uid});
	};

	const dispatchUpdateCardAction = (checklistItems: ChecklistItem[]) => {
		dispatch(updateCard({ ...cardInfo, checklistItems })); 
	};
 
	React.useLayoutEffect(() => {
		navigation.setOptions({
			// eslint-disable-next-line react/display-name
			headerRight: () => <ViewCardModalRightHeader 
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
				{(cardInfo.checklistItems && cardInfo.checklistItems.length > 0) 
					? <><Text
						style={CreateCardModalStyle.inputLabelDark}>
						Checklist
					</Text>
					<Controller
						name="checklistItems"
						control={control}
						render={({ field: { onChange, value }}) => 
							<Checklist 
								isEditMode={false}
								onChange={(checklistItems: ChecklistItem[]) => {
									onChange(checklistItems);
									dispatchUpdateCardAction(checklistItems);
								}}
								data={value} />
						}/></>
					: null
				}
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