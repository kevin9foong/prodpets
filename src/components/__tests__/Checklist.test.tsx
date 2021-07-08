import React from 'react'; 
import Checklist, { ChecklistItem, StateProps as ChecklistProps } from '../Checklist';
import { render, fireEvent, within } from '@testing-library/react-native';
import { TouchableOpacity } from 'react-native';

const checklistProps: ChecklistProps = {
	data: [
		{content: 'hello', isComplete: true}, 
		{content: 'world', isComplete: true}
	]
};

// for unit testing of component libraries
it('renders correct number of checklist items', () => {
	const { UNSAFE_getAllByType } = render(<Checklist data={checklistProps.data} />);
	const checklistItems = UNSAFE_getAllByType(ChecklistItem);
	expect(checklistItems.length).toBe(2); 
});

// integration testing
it('creates new checklist item when create button is clicked', () => {
	const { getByText, getByPlaceholderText, queryByDisplayValue } = render(<Checklist data={checklistProps.data} />);

	const notFoundChecklistItem = queryByDisplayValue('hello world'); 
	expect(notFoundChecklistItem).toBeNull();

	fireEvent.changeText(getByPlaceholderText('New checklist entry'), 'hello world');
	fireEvent.press(getByText('Create'));
	const addedChecklistItem = queryByDisplayValue('hello world'); 
	expect(addedChecklistItem).toBeTruthy(); 
});

it('deletes checklist item when delete button is clicked', () => {
	const { queryByText, queryByDisplayValue } = render(<Checklist data={[checklistProps.data[0]]} />);

	const checklistItem = queryByDisplayValue('hello'); 
	expect(checklistItem).toBeTruthy(); 

	fireEvent.press(queryByText('Delete')); 

	const notFoundChecklistItem = queryByDisplayValue('hello'); 
	expect(notFoundChecklistItem).toBeNull();
});