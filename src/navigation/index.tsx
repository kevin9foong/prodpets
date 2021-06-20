import * as React from 'react'; 
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { selectUserUid } from '../redux/slices/userSlice';
import AuthScreen from '../screens/AuthScreen';
import CreateCardModal from '../screens/home/CreateCardModal';
import HomeTabNavigator from './HomeTab';
import { AuthStackParamList, HomeStackParamList } from './types';
import NavigatorStyle from '../styles/navigation/Navigator.style';

const AuthStack = createStackNavigator<AuthStackParamList>(); 
const HomeStack = createStackNavigator<HomeStackParamList>(); 

const Navigator: React.FC = () => {
	// check if the user exists in the Redux state.
	const userUid = useSelector(selectUserUid);

	return (
		<>
			<StatusBar /> 
			{userUid
				? <HomeStackNavigator />
				: <AuthStackNavigator />
			}	
		</>
	);
};

const AuthStackNavigator = () => {
	return (
		<AuthStack.Navigator
			screenOptions={{ 
				headerShown: false
			}}>
			<AuthStack.Screen name="Auth" component={AuthScreen}/>
		</AuthStack.Navigator> 
	);
};

const HomeStackNavigator = () => {
	return (
		<HomeStack.Navigator>
			<HomeStack.Group
				screenOptions={{ 
					headerShown: false
				}}>
				<HomeStack.Screen name="Home" component={HomeTabNavigator}/>
			</HomeStack.Group> 
			<HomeStack.Group
				screenOptions={{
					presentation: 'modal'
				}}
			>
				<HomeStack.Screen 
					name="CreateCardModal" 
					component={CreateCardModal}
					options={{
						headerStyle: NavigatorStyle.header,
						headerTitle: 'Add New Card'
					}} /> 
			</HomeStack.Group>
		</HomeStack.Navigator>
	);
};

export default Navigator; 