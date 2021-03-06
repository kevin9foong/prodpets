import React, { useEffect, useState } from 'react'; 
import {
	View,
	Text,
	Button, 
	Platform
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks';

import DateTimePicker from '@react-native-community/datetimepicker';
import AndroidDateTimePicker from '../commons/AndroidDateTimePicker';
import CardFormStyle from '../../styles/components/home/CardForm.style';
import TextArea from '../commons/TextArea';
import Checklist, { ChecklistItem } from '../commons/Checklist';

import { CardModel, CardModelWithUid } from '../../database/models/cards';
import { addCard, updateCard, deleteCard } from '../../redux/actions/cards';
import { Tags } from '../../redux/reducers/tags';
import { selectAllTags } from '../../redux/selectors/tags';
import { generateUuid } from '../../util/uuidGenerator';
import { DropDownPicker, MultiDropDownPicker } from '../commons/DropdownPicker';
import { overwriteTags } from '../../redux/actions/tags';
import { TextInput } from 'react-native-gesture-handler';

export type formType = 'edit' | 'create' | 'view'

type StateProps = {
	defaultValues?: CardModelWithUid, 
	navigation: any,  
	formType: formType
}

type UpdateCardModalRightHeaderProps = {
	onSaveSubmit: () => void,
	onDeleteSubmit: () => void, 
}

type CreateCardModalRightHeaderProps = {
	onSaveSubmit: () => void
}

const UpdateCardModalRightHeader = ({onDeleteSubmit, onSaveSubmit}: UpdateCardModalRightHeaderProps) => {
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
				accessibilityLabel='Save Card'
				title='Save' 
				onPress={onSaveSubmit}/> 
		</View> 
	</View>;
};

const CreateCardModalRightHeader = ({onSaveSubmit}: CreateCardModalRightHeaderProps) => {	
	return <View
		style={{ 
			paddingHorizontal: 20
		}}>
		<Button 
			accessibilityLabel='Create Card'
			title='Create' 
			onPress={onSaveSubmit}/>
	</View>; 
};

const CardForm: React.FC<StateProps> = ({defaultValues, navigation, formType}: StateProps) => {
	const dispatch = useDispatch(); 
	const [tags, setTags] = useState<Tags>(useAppSelector(selectAllTags));
	const [cardUid, setCardUid] = useState<string>();

	useEffect(() => {
		setCardUid(defaultValues?.uid ?? generateUuid());
	}, []);

	const removeCardUidFromTags = (cardUid: string) => {
		const tagNames = Object.keys(tags); 
		const updatedTags = {...tags};
		tagNames.forEach(tagName => {
			const filteredCardTags = updatedTags[tagName].filter(uid => uid !== cardUid); 
			if (filteredCardTags.length > 0) {
				updatedTags[tagName] = filteredCardTags; 
			} else {
				delete updatedTags[tagName]; 
			}
		});

		return updatedTags; 
	};

	const onDeleteSubmit = (cardUid: string) => {
		if (defaultValues?.uid) {
			dispatch(deleteCard(defaultValues.uid)); 
			dispatch(overwriteTags(removeCardUidFromTags(cardUid)));
		}
		navigation.navigate('Home');
	};
	
	const onUpdateSubmit = (data: CardModel) => {
		if (defaultValues?.uid) {
			const updatedCardData = {uid: defaultValues.uid, ...data};
			dispatch(updateCard(updatedCardData));
			dispatch(overwriteTags(tags));
			navigation.navigate('ViewCardModal', {uid: defaultValues.uid});
		} else {
			navigation.goBack();
		}
	};

	const onCreateSubmit = (cardUid: string, data: CardModel) => {
		dispatch(addCard(cardUid, data)); 
		dispatch(overwriteTags(tags));
		navigation.goBack();
	};

	// safe to typecast as userUid has to be not-null to access this screen.
	const { control, handleSubmit, formState: { errors }} = useForm(); 

	const onPrimaryButtonPress = (data: CardModel) => {
		formType === 'edit' ? onUpdateSubmit(data) : onCreateSubmit(cardUid!, data);
	}; 

	React.useLayoutEffect(() => {
		navigation.setOptions({
			// eslint-disable-next-line react/display-name
			headerRight: () => formType === 'edit' 
				? <UpdateCardModalRightHeader 
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					onDeleteSubmit={() => onDeleteSubmit!(cardUid!)} 
					onSaveSubmit={handleSubmit(onPrimaryButtonPress)} />
				: <CreateCardModalRightHeader 
					onSaveSubmit={handleSubmit(onPrimaryButtonPress)} />
		});
	});

	return (
		<View
			style={CardFormStyle.container}
		>
			<View 
				style={CardFormStyle.topContainer}
			>
				<Controller 
					defaultValue={defaultValues?.title}
					name="title"
					control={control}
					render={({ field: { onChange, onBlur, value }}) => (
						<View 
							style={CardFormStyle.titleContainer}
						>
							<Text
								style={CardFormStyle.inputLabel}
							>
									Title
							</Text>
							<TextArea 
								style={CardFormStyle.titleInput}
								onBlur={onBlur}
								onChangeText={value => onChange(value)}
								value={value}
								placeholder='Title'
							/>
						</View>
					)}
				/>
				<Controller 
					defaultValue={defaultValues?.description}
					name="description"
					control={control}
					render={({ field: { onChange, onBlur, value }}) => (
						<View 
							style={CardFormStyle.descriptionContainer}
						>
							<Text
								style={CardFormStyle.inputLabel}>
									Description
							</Text>
							<TextArea 
								style={CardFormStyle.descriptionInput}
								onBlur={onBlur}
								onChangeText={value => onChange(value)}
								value={value}
								placeholder='Description'
							/>
						</View>
					)}
				/>
			</View>
			<View
				style={CardFormStyle.bottomContainer}
			>	
				<Controller
					defaultValue={defaultValues?.checklistItems}
					name="checklistItems"
					control={control}
					render={({ field: { onChange, value }}) =>  
						<View style={CardFormStyle.fieldContainer}> 
							<Text
								style={CardFormStyle.inputLabelDark}>
							Checklist
							</Text>
							<Checklist 
								isEditMode={true}
								onChange={(checklistItems: ChecklistItem[]) => {
									onChange(checklistItems);
								}}
								data={value} />
						</View>
					}
				/>
				<Controller 
					name="startdate"
					defaultValue={defaultValues?.startdate ? new Date(defaultValues.startdate) : new Date()}
					control={control}
					render={({ field: { onChange, value }}) => (
						<View 
							style={CardFormStyle.fieldContainer}
						>
							<Text
								style={CardFormStyle.inputLabelDark}>
							Start Date
							</Text>
							{
								Platform.OS === 'ios'
									? <DateTimePicker 
										style={CardFormStyle.dateTimeInput}
										value={value}
										mode={'datetime'}
										display='default'
										onChange={(event, date) => onChange(date)}
									/>
									: <AndroidDateTimePicker 
										value={value} 
										onChange={onChange}
									/>
							}
						</View>)}
				/>
				<Controller 
					name="duedate"
					defaultValue={defaultValues?.duedate ? new Date(defaultValues.duedate) : new Date()}
					control={control}
					render={({ field: { onChange, value }}) => (
						<View 
							style={CardFormStyle.fieldContainer}
						>
							<Text
								style={CardFormStyle.inputLabelDark}>
							Due Date
							</Text>
							{
								Platform.OS === 'ios'
									? <DateTimePicker 
										style={CardFormStyle.dateTimeInput}
										value={value}
										mode={'datetime'}
										display='default'
										onChange={(event, date) => onChange(date)}
									/>
									: <AndroidDateTimePicker 
										value={value} 
										onChange={onChange}
									/>
							}
						</View>)}
				/>
				<Controller 
					name="effortHours"
					defaultValue={defaultValues?.effortHours ?? undefined}
					control={control}
					render={({field: {onChange, value}}) => (
						<View 
							style={CardFormStyle.fieldContainer}
						>
							<Text
								style={CardFormStyle.inputLabelDark}>
							Effort hours
							</Text>
							<TextInput
								keyboardType='number-pad'
								placeholder={'Expected effort hours'}
								style={CardFormStyle.effortHoursInput} 
								value={value}
								onChangeText={(val) => onChange(val.replace(/[^0-9]/g, ''))}
							/>
						</View>
					)}
				/>
				<Controller 
					name="status"
					defaultValue={defaultValues?.status ?? 'incomplete'}
					control={control}
					render={({ field: { onChange, value }}) => (
						<View 
							style={CardFormStyle.fieldContainer}
						>
							<Text
								style={CardFormStyle.inputLabelDark}>
							Status
							</Text>
							<DropDownPicker
								value={value}
								onValueChange={onChange} 
								items={[
									{label: 'In Progress', value: 'in progress'},
									{label: 'Completed', value: 'completed'},
									{label: 'Incomplete', value: 'incomplete'}
								]}
							/>
						</View>
					)
					}
				/>
				<Controller 
					name="tags"
					defaultValue={defaultValues?.tags ?? []}
					control={control}
					render={({ field: { onChange, value }}) => (
						<View 
							style={CardFormStyle.fieldContainer}
						>
							<Text
								style={CardFormStyle.inputLabelDark}>
							Tags
							</Text>
							{/* TODO: add support for cardStatus typescript static check */}
							<MultiDropDownPicker 
								searchableInputPlaceholderText='Search/Add Tags'
								value={value} 
								onAdditionalItemSelect={onChange}
								onItemCreateNew={(tagName) => {
									onChange([...value, tagName]); 
									// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
									// safe to assert not-null due to useEffect setCardUid
									setTags({...tags, [tagName]: [...(tags[tagName] || []), cardUid!]});
								}}
								onItemDelete={(deletedTag) => {
									onChange(value.filter((tag: string) => tag !== deletedTag));
									const newTags = {...tags}; 
									const deletedTagCardUids = newTags[deletedTag].filter(uid => uid !== cardUid); 
									if (deletedTagCardUids.length === 0) {
										delete newTags[deletedTag]; 
									} else {
										newTags[deletedTag] = deletedTagCardUids; 
									}
									setTags(newTags);
								}}
								items={Object.keys(tags).map(tagName => ({label: tagName, value: tagName}))}
							/>
						</View>
					)
					}
				/>
			</View>
		</View> 
	);
};

export default CardForm;
