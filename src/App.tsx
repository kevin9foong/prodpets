import { registerRootComponent } from 'expo';
import React from 'react';
import firebase from 'firebase/app';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import store from './redux/store';
import Navigator from './navigation';
import AuthContainer from './auth/AuthContainer';
import { firebaseConfig } from './config/secrets';


firebase.initializeApp(firebaseConfig);

const App = () => {
	return (
		<Provider store={store}> 
			<AuthContainer>
				<NavigationContainer>
					<Navigator /> 
				</NavigationContainer>
			</AuthContainer>
		</Provider>
	);
};

registerRootComponent(App);
