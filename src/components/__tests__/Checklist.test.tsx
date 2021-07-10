import React from 'react'; 
import Checklist, { ChecklistItem, StateProps as ChecklistProps } from '../Checklist';
import { render, fireEvent } from '@testing-library/react-native';

const checklistProps: ChecklistProps = {
	data: [
		{content: 'hello', isComplete: true}, 
		{content: 'world', isComplete: true}
	], 
	onChange: jest.fn()
};

// for unit testing of component libraries
it('renders correct number of checklist items', () => {
	const { UNSAFE_getAllByType } = render(
		<Checklist 
			onChange={checklistProps.onChange}
			data={checklistProps.data} />);
	const checklistItems = UNSAFE_getAllByType(ChecklistItem);
	expect(checklistItems.length).toBe(2); 
});