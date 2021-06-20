import React from 'react'; 
import {
	View,
	Text,
	Button
} from 'react-native';
import CreateCardModalStyle from '../../styles/components/home/CreateCardForm.style';

import { useForm, Controller } from 'react-hook-form';
import TextArea from '../TextArea';

type StateProps = {
	onFormSubmit: () => void
}

const CreateCardForm: React.FC<StateProps> = ({onFormSubmit}: StateProps) => {
	const { control, handleSubmit, formState: { errors }} = useForm(); 
	const onSubmit = (data: any) => console.log(data); 

	return (
		<View
			style={CreateCardModalStyle.container}
		>
			<View 
				style={CreateCardModalStyle.topContainer}>
				<Controller 
					name="Title"
					control={control}
					render={({ field: { onChange, onBlur, value }}) => (
						<View 
							style={CreateCardModalStyle.titleContainer}
						>
							<Text
								style={CreateCardModalStyle.inputLabel}
							>
									Title</Text>
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
					name="Description"
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
				<Button title="Submit" onPress={() => {
					handleSubmit(onSubmit);
					onFormSubmit();
				}} />
			</View>
		</View> 
	);

};

export default CreateCardForm;