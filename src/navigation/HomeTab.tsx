/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native';

import DashboardScreen from '../screens/home/DashboardScreen';
import CalendarScreen from '../screens/home/CalendarScreen';
import GameScreen from '../screens/home/GameScreen';
import SocialScreen from '../screens/home/SocialScreen';
import { DashboardParamList, CalendarParamList } from './types';

import HomeTabStyle from '../styles/navigation/Navigator.style';
import themeStyle from '../styles/theme.style';

const BottomTab = createBottomTabNavigator(); 

const HomeTab: React.FC = () => {
	return ( 
		<>
			<BottomTab.Navigator
				initialRouteName="Task Dashboard"
				screenOptions={{
					headerStyle: HomeTabStyle.header, 
					tabBarActiveTintColor: themeStyle['color-primary-300'], 
					tabBarButton: props => <TouchableOpacity {...props} />
				}}
			>
				<BottomTab.Screen 
					name="Task Dashboard" 
					component={DashboardScreenNavigator} 
					options={{
						tabBarIcon: ({ color }) => 
							<TabBarIcon name="tasks" color={color} />
					}}
				/> 
				<BottomTab.Screen 
					name="Calendar Overview" 
					component={CalendarScreenNavigator} 
					options={{
						tabBarIcon: ({ color }) => 
							<TabBarIcon name="calendar-alt" color={color} />,
					}}
				/> 
				{/* TODO: fix this styling/find a better position for this. */}
				<BottomTab.Screen 
					name="Create"
					// change to some placeholder.
					component={CalendarScreenNavigator}
					options={{
						tabBarLabel: () => null,
						tabBarIcon: () => 
							<TabBarIcon name="plus-circle" size={38} color={themeStyle['color-primary-300']} />
					}}
					listeners={({navigation}) => ({
						tabPress: e => {
							e.preventDefault();
							navigation.navigate('CreateCardModal'); 
						}
					})}
				/> 
				{/* implemented later in next iteration cycle */}
				<BottomTab.Screen name="Game" component={GameScreen} />
				<BottomTab.Screen name="Social" component={SocialScreen} />
			</BottomTab.Navigator>
		</>
	);
};

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome5>['name']; color: string; size?: number }) {
	return <FontAwesome5 size={props.size ?? 30} style={{ marginBottom: -3 }} {...props} />;
}


// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const DashboardStack = createStackNavigator<DashboardParamList>();

function DashboardScreenNavigator() {
	return (
		<DashboardStack.Navigator
			screenOptions={{
				headerShown: false
			}}>
			<DashboardStack.Screen
				name="DashboardScreen"
				component={DashboardScreen}
			/>
		</DashboardStack.Navigator>
	);
}

const CalendarStack = createStackNavigator<CalendarParamList>();

function CalendarScreenNavigator() {
	return (
		<CalendarStack.Navigator
			screenOptions={{
				headerShown: false
			}}>
			<CalendarStack.Screen
				name="CalendarScreen"
				component={CalendarScreen}
			/>
		</CalendarStack.Navigator>
	);
}

export default HomeTab;