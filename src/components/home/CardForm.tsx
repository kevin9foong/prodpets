import React from 'react'; 
import {
	View,
	Text,
	Button, 
	Platform
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import DateTimePicker from '@react-native-community/datetimepicker';
import AndroidDateTimePicker from '../AndroidDateTimePicker';
import CreateCardModalStyle from '../../styles/components/home/CardForm.style';
import TextArea from '../TextArea';
import { CardModel, CardModelWithUid } from '../../database/models/cards';
import Checklist, { ChecklistItem } from '../../components/Checklist';
import { addCard, updateCard, deleteCard } from '../../redux/actions/cards';
import { generateUuid } from '../../util/uuidGenerator';

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

	const onDeleteSubmit = () => {
		if (defaultValues?.uid) {
			dispatch(deleteCard(defaultValues.uid)); 
		}
		navigation.goBack();
	};
	
	const onUpdateSubmit = (data: CardModel) => {
		if (defaultValues?.uid) {
			const updatedCardData = {uid: defaultValues.uid, ...data};
			dispatch(updateCard(updatedCardData));
			navigation.navigate('ViewCardModal', {uid: defaultValues.uid, 
				...data,
				startdate: data.startdate.toString(), 
				duedate: data.duedate.toString()});
		} else {
			navigation.goBack();
		}
	};

	const onCreateSubmit = (data: CardModel) => {
		dispatch(addCard(generateUuid(), data)); 
		navigation.goBack();
	};

	// safe to typecast as userUid has to be not-null to access this screen.
	const { control, handleSubmit, formState: { errors }} = useForm(); 

	const onPrimaryButtonPress = (data: CardModel) => {
		formType === 'edit' ? onUpdateSubmit(data) : onCreateSubmit(data);
	}; 

	React.useLayoutEffect(() => {
		navigation.setOptions({
			// eslint-disable-next-line react/display-name
			headerRight: () => formType === 'edit' 
				? <UpdateCardModalRightHeader 
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					onDeleteSubmit={onDeleteSubmit!} 
					onSaveSubmit={handleSubmit(onPrimaryButtonPress)} />
				: <CreateCardModalRightHeader 
					onSaveSubmit={handleSubmit(onPrimaryButtonPress)} />
		});
	});

	return (
		<View
			style={CreateCardModalStyle.container}
		>
			<View 
				style={CreateCardModalStyle.topContainer}
			>
				<Controller 
					defaultValue={defaultValues?.title}
					name="title"
					control={control}
					render={({ field: { onChange, onBlur, value }}) => (
						<View 
							style={CreateCardModalStyle.titleContainer}
						>
							<Text
								style={CreateCardModalStyle.inputLabel}
							>
									Title
							</Text>
							<TextArea 
								style={CreateCardModalStyle.titleInput}
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
							style={CreateCardModalStyle.descriptionContainer}
						>
							<Text
								style={CreateCardModalStyle.inputLabel}>
									Description
							</Text>
							<TextArea 
								style={CreateCardModalStyle.descriptionInput}
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
				style={CreateCardModalStyle.bottomContainer}
			>	
				<Controller
					defaultValue={defaultValues?.checklistItems}
					name="checklistItems"
					control={control}
					render={({ field: { onChange, value }}) =>  
						<View style={CreateCardModalStyle.fieldContainer}> 
							<Text
								style={CreateCardModalStyle.inputLabelDark}>
							Checklist
							</Text>
							<Checklist 
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
			</View>
		</View> 
	);
};

export default CardForm;