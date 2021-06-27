import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import ChecklistStyles from '../styles/components/commons/Checklist';

export interface ChecklistItem { 
    isComplete: boolean, 
    content: string
} 

type StateProps = {
    data: ChecklistItem[]
};

const Checklist = ({data = [{content: 'hi', isComplete: true}, {content: 'bye', isComplete: true}]}: StateProps): JSX.Element => {
	const [items, setItems] = useState(data);

	const renderChecklistItems = items.map((item, index) => 
		<ChecklistItem key={index} data={item} />);

	return (
		<View>
			{renderChecklistItems}
		</View>
	);
};

type ChecklistItemProps = { 
    data: ChecklistItem
}

const ChecklistItem = ({ data }: ChecklistItemProps) => {
	return (
		<View 
			style={ChecklistStyles.checklistContainer}
			onTouchStart={() => console.log('ive been touched')}>
			<TextInput 
				style={ChecklistStyles.textInput}>
				{data.content}
			</TextInput>
			<View 
				style={ChecklistStyles.statusToggleButton}>
				<TouchableOpacity>
					<Text>Toggle</Text>
				</TouchableOpacity>
			</View>
		</View>);
};

export default Checklist;
