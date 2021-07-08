import React, { useState } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ChecklistStyles from '../styles/components/commons/Checklist';

export interface ChecklistItem { 
    isComplete: boolean, 
    content: string
} 

export type StateProps = {
    data: ChecklistItem[]
};

const Checklist = ({data = []}: StateProps): JSX.Element => {
	const [items, setItems] = useState(data);

	const renderChecklistItems = items.map((item, index) => 
		<ChecklistItem onDelete={() => setItems([...items.slice(0, index), ...items.slice(index + 1)])} key={index} data={item} />);

	return (
		<View style={{display: 'flex'}}>
			{renderChecklistItems}
			<ChecklistAdderItem 
				onPress={(content: string) => 
				{ if (content && content !== '' ) {setItems([...items, {content, isComplete: false}]);}}} /> 
		</View>
	);
};

type ChecklistItemProps = { 
    data: ChecklistItem, 
	onDelete: () => void
}

export const ChecklistItem = ({ data, onDelete }: ChecklistItemProps): JSX.Element => {
	return (
		<View 
			style={ChecklistStyles.checklistItemContainer}
			onTouchStart={() => console.log('ive been touched')}>
			<TextInput 
				value={data.content}
				style={ChecklistStyles.textInput}
				multiline={true}
			>
			</TextInput>
			<View 
				style={ChecklistStyles.statusToggleButton}>
				<TouchableOpacity
					onPress={onDelete}
				>
					<Text>Delete</Text>
				</TouchableOpacity>
			</View>
		</View>);
};

// Controlled Component
const ChecklistAdderItem = ({onPress}) => {
	const [content, setContent] = useState<string>(''); 

	return (
		<View 
			style={ChecklistStyles.checklistItemContainer}
		> 
			<TextInput 
				multiline={true}
				placeholder='New checklist entry'
				style={ChecklistStyles.textInput}
				value={content}
				onChangeText={text => setContent(text)}
			/>
			<Button 
				title={'Create'} 
				onPress={() => { 
					onPress(content); 
					setContent('');}} />
		</View>);
};

export default Checklist;
