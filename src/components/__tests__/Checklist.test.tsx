import React from 'react'; 
import Checklist, { EditableChecklistItem, StateProps as ChecklistProps } from '../commons/Checklist';
import { render, fireEvent } from '@testing-library/react-native';

const checklistProps: ChecklistProps = {
	isEditMode: true, 
	data: [], 
	onChange: jest.fn((changed) => {checklistProps.data=changed;})
};

// for unit testing of component libraries
it('renders correct number of checklist items', () => {
	checklistProps.data = 
	[{content: 'hello', isComplete: true}, {content: 'world', isComplete: true}]; 
	const { UNSAFE_getAllByType } = render(
		<Checklist 
			isEditMode={checklistProps.isEditMode}
			onChange={checklistProps.onChange}
			data={checklistProps.data} />);
	const checklistItems = UNSAFE_getAllByType(EditableChecklistItem);
	expect(checklistItems.length).toBe(2); 
});

it('creates new checklist item when create button is clicked', () => {
	const { rerender, getByText, getByPlaceholderText, queryByDisplayValue } = render(
		<Checklist 
			isEditMode={checklistProps.isEditMode}
			onChange={checklistProps.onChange}
			data={checklistProps.data} />);

	const notFoundChecklistItem = queryByDisplayValue('hello world'); 
	expect(notFoundChecklistItem).toBeNull();

	fireEvent.changeText(getByPlaceholderText('New checklist entry'), 'hello world');
	fireEvent.press(getByText('Create'));

	rerender(<Checklist 
		isEditMode={checklistProps.isEditMode}
		onChange={checklistProps.onChange}
		data={checklistProps.data} />);
	
	const addedChecklistItem = queryByDisplayValue('hello world'); 
	expect(addedChecklistItem).toBeTruthy(); 
});

it('deletes checklist item when delete button is clicked', () => {
	checklistProps.data = 
	[{content: 'hello', isComplete: true}, {content: 'world', isComplete: true}]; 
	const { rerender, getAllByText, queryByDisplayValue } = render(
		<Checklist 
			isEditMode={checklistProps.isEditMode}
			onChange={checklistProps.onChange}
			data={checklistProps.data} />);

	const checklistItem = queryByDisplayValue('hello'); 
	expect(checklistItem).toBeTruthy(); 
	const checklistItemTwo = queryByDisplayValue('world'); 
	expect(checklistItemTwo).toBeTruthy(); 

	const deleteButtons = getAllByText('Delete'); 
	fireEvent.press(deleteButtons[0]);

	rerender(<Checklist 
		isEditMode={checklistProps.isEditMode}
		onChange={checklistProps.onChange}
		data={checklistProps.data} />);

	const notFoundChecklistItem = queryByDisplayValue('hello'); 
	expect(notFoundChecklistItem).toBeNull();
});

it('pressing checklist item in view mode updates its isCompleted value', () => {
	checklistProps.data = 
	[{content: 'hello', isComplete: true}, {content: 'world', isComplete: true}]; 

	const { getByText } = render(
		<Checklist 
			isEditMode={false}
			onChange={checklistProps.onChange}
			data={checklistProps.data} />);

	const checklistItem = getByText('hello'); 
	fireEvent.press(checklistItem);
	
	expect(checklistProps.data[0].isComplete).toBe(false); 
});