import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
// TODO: implement in future update
// import DraggableFlatList from 'react-native-draggable-flatlist';

import ChecklistStyles from '../styles/components/commons/Checklist';

export interface ChecklistItem { 
    isComplete: boolean, 
    content: string
} 

export type StateProps = {
    data: ChecklistItem[], 
	onChange: (checklistItems: ChecklistItem[]) => void
};

const Checklist = ({data = [], onChange}: StateProps): JSX.Element => {
	const onChangeText = (index: number) =>	(changedText: string) => {
		const changedItems = [...data]; 
		changedItems[index] = { ...changedItems[index], content:changedText };
		onChange(changedItems);
	}; 

	const renderChecklistItems = data.map((item, index) => 
		<ChecklistItem 
			onChangeText={onChangeText(index)}
			onDelete={() => onChange([...data.slice(0, index), ...data.slice(index + 1)])} key={index} data={item} />);

	return (
		<View style={{display: 'flex', width: '100%'}}>
			{renderChecklistItems}
			<ChecklistAdderItem 
				onPress={(content: string) => 
				{ if (content && content !== '' ) {onChange([...data, {content, isComplete: false}]);}}} /> 
		</View>
	);
};

type ChecklistItemProps = { 
    data: ChecklistItem, 
	onDelete: () => void,
	onChangeText: (changedText: string) => void
}

export const ChecklistItem = ({ data, onDelete, onChangeText }: ChecklistItemProps): JSX.Element => {
	return (
		<View 
			style={data.isComplete 
				? ChecklistStyles.checklistItemCompletedContainer 
				: ChecklistStyles.checklistItemContainer} 
		> 
			<View
				style={ChecklistStyles.textInputContainer}>
				<TextInput 
					value={data.content}
					onChangeText={onChangeText}
					style={ChecklistStyles.textInput}
					multiline={true}
				>
				</TextInput>
			</View> 
			<View
				style={ChecklistStyles.actionButton}>
				<Button 
					title={'Delete'} 
					onPress={onDelete}
				/>
			</View>
		</View>);
};

type ChecklistAdderItemProps = { 
	onPress: (checklistContent: string) => void
}

// Controlled Component
const ChecklistAdderItem = ({onPress}: ChecklistAdderItemProps) => {
	const [content, setContent] = useState<string>(''); 

	return (
		<View 
			style={ChecklistStyles.checklistItemContainer}
		> 
			<View
				style={ChecklistStyles.textInputContainer}>
				<TextInput 
					multiline={true}
					placeholder='New checklist entry'
					style={ChecklistStyles.textInput}
					value={content}
					onChangeText={text => setContent(text)}
				/>
			</View>
			<View
				style={ChecklistStyles.actionButton}>
				<Button 
					title={'Create'} 
					onPress={() => { 
						onPress(content); 
						setContent('');}} />
			</View>
		</View>);
};

export default Checklist;
