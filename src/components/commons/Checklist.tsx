import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
// TODO: implement in future update
// import DraggableFlatList from 'react-native-draggable-flatlist';

import ChecklistStyles from '../../styles/components/commons/Checklist';

export interface ChecklistItem { 
    isComplete: boolean, 
    content: string
} 

export type StateProps = {
	isEditMode: boolean, 
    data: ChecklistItem[], 
	onChange: (checklistItems: ChecklistItem[]) => void
};

const Checklist = ({ isEditMode, data = [], onChange }: StateProps): JSX.Element => {
	const onChangeText = (index: number) =>	(changedText: string) => {
		const changedItems = [...data]; 
		changedItems[index] = { ...changedItems[index], content:changedText };
		onChange(changedItems);
	}; 

	const renderChecklistItems = data.map((item, index) => 
		isEditMode 
			? <EditableChecklistItem 
				key={index} 
				data={item}
				onChangeText={onChangeText(index)}
				onDelete={() => onChange([...data.slice(0, index), ...data.slice(index + 1)])} 
			/>
			: <ViewChecklistItem
				key={index}
				data={item}
				onPress={() => { 
					const changedItems = [...data]; 
					changedItems[index] = { ...changedItems[index], isComplete: !changedItems[index].isComplete };
					onChange(changedItems); 
				}} 
			/>);

	return (
		<View style={{display: 'flex', width: '100%'}}>
			{renderChecklistItems}
			{isEditMode 
				? <ChecklistAdderItem 
					onPress={(content: string) => 
					{ if (content && content !== '' ) {onChange([...data, {content, isComplete: false}]);}}} /> 
				: null }
		</View>
	);
};

type ViewChecklistItemProps = {
	data: ChecklistItem, 
	onPress: () => void
}

export const ViewChecklistItem = ({ data, onPress }: ViewChecklistItemProps): JSX.Element => {
	return (
		<View 
			onTouchEnd={onPress}
			style={data.isComplete 
				? ChecklistStyles.checklistItemCompletedContainer 
				: ChecklistStyles.checklistItemContainer} 
		>
			<View
				style={ChecklistStyles.textInputContainer}>
				<Text>
					{data.content}
				</Text>
			</View>
		</View> );
};


type EditableChecklistItemProps = { 
    data: ChecklistItem, 
	onDelete: () => void,
	onChangeText: (changedText: string) => void,
}

export const EditableChecklistItem = ({ data, onDelete, onChangeText }: EditableChecklistItemProps): JSX.Element => {
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
				/>
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
