// import React from 'react'; 
// import CreateCardModal from '../CreateCardModal';
// import { render, fireEvent } from '@testing-library/react-native';
// import { Provider } from 'react-redux';
// import store from '../../../redux/store';

// // integration testing
// // refer to: https://www.reactnativeschool.com/setup-jest-tests-with-react-navigation

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// // let push: any, route: any, navigate: any; 

// // beforeEach(() => {
// // 	push = jest.fn();
// // 	route = jest.fn(); 
// // }); 

// it('creates new checklist item when create button is clicked', () => {
	
// 	const { getByText, getByPlaceholderText, queryByDisplayValue } = render(
// 		<Provider store={store}>
// 			<CreateCardModal navigation={{setOptions: jest.fn()}}/>
// 		</Provider>);

// 	// const notFoundChecklistItem = queryByDisplayValue('hello world'); 
// 	// expect(notFoundChecklistItem).toBeNull();

// 	// fireEvent.changeText(getByPlaceholderText('New checklist entry'), 'hello world');
// 	// fireEvent.press(getByText('Create'));
// 	// const addedChecklistItem = queryByDisplayValue('hello world'); 
// 	// expect(addedChecklistItem).toBeTruthy(); 
// });

// it('deletes checklist item when delete button is clicked', () => {
// 	const { queryByText, queryByDisplayValue } = render(
// 		<Provider store={store}>
// 			<CreateCardModal navigation={{setOptions: jest.fn()}}/>
// 		</Provider>);

// 	// const checklistItem = queryByDisplayValue('hello'); 
// 	// expect(checklistItem).toBeTruthy(); 

// 	// fireEvent.press(queryByText('Delete')); 

// 	// const notFoundChecklistItem = queryByDisplayValue('hello'); 
// 	// expect(notFoundChecklistItem).toBeNull();
// });