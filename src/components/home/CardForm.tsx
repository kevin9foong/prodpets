import React from 'react'; 
import {
	View,
	Text,
	Button
} from 'react-native';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';

import CreateCardModalStyle from '../../styles/components/home/CardForm.style';
import TextArea from '../TextArea';
import { CardModel, CardModelWithUid } from '../../database/models/cards';
import { selectUserUid } from '../../redux/slices/userSlice';

type StateProps = {
	defaultValues?: CardModelWithUid, 
	onFormSubmit: (userUid: string, data: CardModel) => void
}

const CardForm: React.FC<StateProps> = ({onFormSubmit, defaultValues}: StateProps) => {
	// safe to typecast as userUid has to be not-null to access this screen.
	const userUid = useSelector(selectUserUid) as string;
	const { control, handleSubmit, formState: { errors }} = useForm(); 
	const onSubmit = (data: {title: string, description: string}) => {
		onFormSubmit(userUid, data);
	}; 

	return (
		<View
			style={CreateCardModalStyle.container}
		>
			<View 
				style={CreateCardModalStyle.topContainer}>
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
				{/* <Controller 
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
								placeholder='Effort'
							/>
						</View>
					)}
				/> */}
				<Button title="Submit" 
					onPress={handleSubmit(onSubmit)}
				/>
			</View>
		</View> 
	);
};

export default CardForm;