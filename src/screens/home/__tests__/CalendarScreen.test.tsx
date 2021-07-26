import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render } from "@testing-library/react-native";
import store from "../../../redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { HomeStackNavigator } from "../../../navigation";
import { CardModelWithUid } from "../../../database/models/cards";

test("Renders CalendarComponent based on cards in Redux Store", () => {
  const cards: CardModelWithUid[] = [
    {
      title: "Task Number 1",
      description: "Task 1 details",
      startdate: new Date(),
      duedate: new Date(),
      uid: "testuid1",
      effortHours: 0,
      tags: [],
      status: "in progress",
      checklistItems: [],
    },
    {
      title: "Task Number 2",
      description: "Task 1 details",
      startdate: new Date(),
      duedate: new Date(),
      uid: "testuid1",
      effortHours: 0,
      tags: [],
      status: "in progress",
      checklistItems: [],
    },
  ];

  store.getState().cards = cards;

  const { queryByText, getByText, getAllByText } = render(
    <Provider store={store}>
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
    </Provider>
  );

  fireEvent.press(getByText("Calendar Overview"));

  expect(getAllByText("Task Number 1")).toBeTruthy();
  expect(getAllByText("Task Number 2")).toBeTruthy();
  // negative test to test that cards that are not there do not show up
  expect(queryByText("Task Number 3")).toBeFalsy();
});

// test('Creating card causes CalendarScreen to display new card', () => {
// 	const { queryByPlaceholderText, getByA11yLabel, getAllByA11yLabel, queryByText, getAllByText, debug } = render(
// 		<Provider store={store}>
// 			<NavigationContainer>
// 				<HomeStackNavigator />
// 			</NavigationContainer>
// 		</Provider>
// 	);

// 	const addButton = getAllByA11yLabel('Add Card')[0];
// 	fireEvent.press(addButton);

// 	const createCardModal = queryByText('Add New Card');
// 	expect(createCardModal).toBeTruthy();

// 	const titleInput = queryByPlaceholderText('Title');
// 	const descriptionInput = queryByPlaceholderText('Description');

// 	fireEvent.changeText(titleInput, 'hello world');
// 	fireEvent.changeText(descriptionInput, 'dummy description');

// 	const createCardButton = getByA11yLabel('Create Card');
// 	fireEvent.press(createCardButton);

// 	// debug();

// 	console.log('STORE', store.getState());

// expect(getAllByText('hello world')).toBeTruthy();
// expect(getAllByText('Task Number 2')).toBeTruthy();
// // negative test to test that cards that are not there do not show up
// expect(queryByText('Task Number 3')).toBeFalsy();
// });
