// integration style tests for Cards

import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { render, fireEvent, act } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { HomeStackNavigator } from "../../navigation";

describe("Testing user card CRUD operations", () => {
  it("create card icon exists on home stack", () => {
    const homeScreenComponent = (
      <Provider store={store}>
        <NavigationContainer>
          <HomeStackNavigator />
        </NavigationContainer>
      </Provider>
    );

    const { getAllByA11yLabel } = render(homeScreenComponent);
    const addButton = getAllByA11yLabel("Add Card");

    expect(addButton).toBeTruthy();
  });

  // positive and negative tests
  it("clicking on create card icon opens the create card modal", async () => {
    const homeScreenComponent = (
      <Provider store={store}>
        <NavigationContainer>
          <HomeStackNavigator />
        </NavigationContainer>
      </Provider>
    );
    const { getAllByA11yLabel, getByText, queryByText } =
      render(homeScreenComponent);
    const addButton = getAllByA11yLabel("Add Card");
    // TODO: fix issue with Not wrapped in act() error polluting test logs
    const notOpenedCreateCardModal = queryByText("Add New Card");
    expect(notOpenedCreateCardModal).toBeNull();

    fireEvent.press(addButton[0]);

    const createCardModal = getByText("Add New Card");
    expect(createCardModal).toBeTruthy();
  });

  // fix this failing test?
  // it('creating redirects back to task dashboard and can create a new card with title and description', () => {
  // 	const homeScreenComponent = (
  // 		<Provider store={store}>
  // 			<NavigationContainer>
  // 				<HomeStackNavigator/>
  // 			</NavigationContainer>
  // 		</Provider>

  // 	);
  // 	const { getAllByA11yLabel, getByA11yLabel, queryByText, queryAllByText, queryByPlaceholderText } = render(homeScreenComponent);

  // 	const addButton = getAllByA11yLabel('Add Card');
  // 	// TODO: fix issue with Not wrapped in act() error polluting test logs

  // 	fireEvent.press(addButton[0]);
  // 	const createCardModal = queryByText('Add New Card');
  // 	expect(createCardModal).toBeTruthy();

  // 	const titleInput = queryByPlaceholderText('Title');
  // 	const descriptionInput = queryByPlaceholderText('Description');

  // 	fireEvent.changeText(titleInput, 'hello world');
  // 	fireEvent.changeText(descriptionInput, 'dummy description');

  // 	const createCardButton = getByA11yLabel('Create Card');
  // 	fireEvent.press(createCardButton);

  // 	const notOpenedCreateCardModal = queryByText('Add New Card');
  // 	expect(notOpenedCreateCardModal).toBeNull();
  // });
});
