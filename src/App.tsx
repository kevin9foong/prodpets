import { registerRootComponent } from "expo";
import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { OverflowMenuProvider } from "react-navigation-header-buttons";

import store from "./redux/store";
import Navigator from "./navigation";
import AuthContainer from "./auth/AuthContainer";

const App = () => {
  return (
    <Provider store={store}>
      <AuthContainer>
        <NavigationContainer>
          <OverflowMenuProvider>
            <Navigator />
          </OverflowMenuProvider>
        </NavigationContainer>
      </AuthContainer>
    </Provider>
  );
};

registerRootComponent(App);
