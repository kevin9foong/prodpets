import React from 'react';
import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react-native';
import { createStore } from 'redux';
import rootReducer from '../../../redux/reducers';
import CalendarScreen from '../CalendarScreen';


test('Renders calendar card correctly according to data', () => {
	const cards = [
		{
			title: 'Task Number 1',
			description: 'Task 1 details',
			startdate: new Date(),
			duedate: new Date(),
			uid: ''
		}, 
	];

	const store = createStore(rootReducer, { cards: cards });

	const { getByText, debug } = render(
		<Provider store={store}>
			<CalendarScreen />
		</Provider>
	);

	debug();

	expect(getByText('Task Number 1')).toBeTruthy();
});