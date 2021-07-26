import React from 'react'; 
import { View, Button, Text } from 'react-native'; 
import { MarkdownView } from 'react-native-markdown-view';
import { useForm, Controller } from 'react-hook-form';
import Checklist, { ChecklistItem } from '../commons/Checklist';
import AndroidDateTimePicker from '../commons/AndroidDateTimePicker';
import { useDispatch } from 'react-redux';

import { CardModelWithUid } from '../../database/models/cards';
import { updateCard } from '../../redux/actions/cards';

import CardFormStyle from '../../styles/components/home/CardForm.style';
import { useEffect } from 'react';
import { MultiItemViewer } from '../commons/DropdownPicker';

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
		style={CardFormStyle.container}
	>
		<View 
			style={CardFormStyle.topContainer}
		>

			<View 
				style={CardFormStyle.titleContainer}
			>
				<Text
					style={CardFormStyle.inputLabel}
				>
								Title
				</Text>
				<Text>
					{cardInfo.title}
				</Text>
			</View>
			<View 
				style={CardFormStyle.descriptionContainer}
			>
				<Text
					style={CardFormStyle.inputLabel}>
								Description
				</Text>
				{/* TODO: Fix or replace Markdown view. */}
				<MarkdownView>
					{cardInfo.description ?? ''}
				</MarkdownView>
			</View>
		</View>
		<View
			style={CardFormStyle.bottomContainer}
		>	
			<View style={CardFormStyle.fieldContainer}> 
				{(cardInfo.checklistItems && cardInfo.checklistItems.length > 0) 
					? <><Text
						style={CardFormStyle.inputLabelDark}>
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
				style={CardFormStyle.fieldContainer}
			>
				<Text
					style={CardFormStyle.inputLabelDark}>
						Start Date
				</Text>
				<AndroidDateTimePicker 
					disabled={true}
					value={new Date(cardInfo.startdate)} 
					// eslint-disable-next-line @typescript-eslint/no-empty-function
					onChange={() => {}}
				/>
			</View>
			<View 
				style={CardFormStyle.fieldContainer}
			>
				<Text
					style={CardFormStyle.inputLabelDark}>
						Due Date
				</Text>
				<AndroidDateTimePicker 
					disabled={true}
					value={new Date(cardInfo.duedate)} 
					// eslint-disable-next-line @typescript-eslint/no-empty-function
					onChange={() => {}}
				/>
			</View>
			{cardInfo.effortHours 
				? <View 
					style={CardFormStyle.fieldContainer}
				>
					<Text
						style={CardFormStyle.inputLabelDark}>
						Effort hours
					</Text>
					<View style={CardFormStyle.effortHoursInput}>
						<Text> 
							{cardInfo.effortHours}
						</Text>
					</View>
				</View>
				: null}
			{cardInfo.status 
				? <View 
					style={CardFormStyle.fieldContainer}
				>
					<Text
						style={CardFormStyle.inputLabelDark}>
						Status
					</Text>
					<View style={CardFormStyle.effortHoursInput}>
						<Text> 
							{cardInfo.status}
						</Text>
					</View>
				</View>
				: null}
			{(cardInfo.tags && cardInfo.tags.length > 0) 
				? <View 
					style={CardFormStyle.fieldContainer}
				>
					<Text
						style={CardFormStyle.inputLabelDark}>
						Tags
					</Text>
					<MultiItemViewer 
						items={cardInfo.tags}
						onItemDelete={() => {}}
						disabled={true}
					/>
				</View>
				: null}
		</View>
	</View> );
};

export default ViewCard; 
