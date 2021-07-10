import React from 'react'; 
import Checklist, { ChecklistItem, StateProps as ChecklistProps } from '../Checklist';
import { render, fireEvent } from '@testing-library/react-native';

const checklistProps: ChecklistProps = {
	data: [], 
	onChange: jest.fn((changed) => {checklistProps.data=changed;})
};

// for unit testing of component libraries
it('renders correct number of checklist items', () => {
	checklistProps.data = 
	[{content: 'hello', isComplete: true}, {content: 'world', isComplete: true}]; 
	const { UNSAFE_getAllByType } = render(
		<Checklist 
			onChange={checklistProps.onChange}
			data={checklistProps.data} />);
	const checklistItems = UNSAFE_getAllByType(ChecklistItem);
	expect(checklistItems.length).toBe(2); 
});

it('creates new checklist item when create button is clicked', () => {
	const { rerender, getByText, getByPlaceholderText, queryByDisplayValue } = render(
		<Checklist 
			onChange={checklistProps.onChange}
			data={checklistProps.data} />);

	const notFoundChecklistItem = queryByDisplayValue('hello world'); 
	expect(notFoundChecklistItem).toBeNull();

	fireEvent.changeText(getByPlaceholderText('New checklist entry'), 'hello world');
	fireEvent.press(getByText('Create'));

	rerender(<Checklist 
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
			onChange={checklistProps.onChange}
			data={checklistProps.data} />);

	const checklistItem = queryByDisplayValue('hello'); 
	expect(checklistItem).toBeTruthy(); 
	const checklistItemTwo = queryByDisplayValue('world'); 
	expect(checklistItemTwo).toBeTruthy(); 

	const deleteButtons = getAllByText('Delete'); 
	fireEvent.press(deleteButtons[0]);

	console.log('ChecklistItems', checklistProps.data);

	rerender(<Checklist 
		onChange={checklistProps.onChange}
		data={checklistProps.data} />);

	const notFoundChecklistItem = queryByDisplayValue('hello'); 
	expect(notFoundChecklistItem).toBeNull();
});