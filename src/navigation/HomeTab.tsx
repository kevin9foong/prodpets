/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import * as React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Item } from 'react-navigation-header-buttons';

import DashboardScreen from '../screens/home/DashboardScreen';
import CalendarScreen from '../screens/home/CalendarScreen';
import GameScreen from '../screens/home/GameScreen';
import SocialScreen from '../screens/home/SocialScreen';
import { DashboardParamList, CalendarParamList } from './types';

import HomeTabStyle from '../styles/navigation/Navigator.style';
import themeStyle from '../styles/theme.style';
import { FontAwesome5HeaderButtons } from '../components/commons/IconHeaderButtons';

const BottomTab = createBottomTabNavigator();

const HomeTabRightHeader = () => {
	return (
		<View
			style={{
				paddingHorizontal: 20,
			}}
		>
			<FontAwesome5HeaderButtons>
				<TouchableOpacity>
					<Item title="Sort" iconName="sort" onPress={() => {}} />
				</TouchableOpacity>
				<TouchableOpacity>
					<Item title="Profile" iconName="user-circle" onPress={() => {}} />
				</TouchableOpacity>
			</FontAwesome5HeaderButtons>
		</View>
	);
};

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
  size?: number;
}) {
	return (
		<FontAwesome5
			size={props.size ?? 30}
			style={{ marginBottom: -3 }}
			{...props}
		/>
	);
}

const HomeTab: React.FC = () => {
	return (
		<>
			<BottomTab.Navigator
				initialRouteName="Task Dashboard"
				screenOptions={{
					headerStyle: HomeTabStyle.header,
					tabBarActiveTintColor: themeStyle['color-primary-300'],
					tabBarButton: (props) => <TouchableOpacity {...props} />,
					headerRight: () => <HomeTabRightHeader />,
				}}
			>
				<BottomTab.Screen
					name="Task Dashboard"
					component={DashboardScreenNavigator}
					options={{
						tabBarIcon: ({ color }) => (
							<TabBarIcon name="tasks" color={color} />
						),
					}}
				/>
				<BottomTab.Screen
					name="Calendar Overview"
					component={CalendarScreenNavigator}
					options={{
						tabBarIcon: ({ color }) => (
							<TabBarIcon name="calendar-alt" color={color} />
						),
					}}
				/>
				{/* TODO: fix this styling/find a better position for this. */}
				<BottomTab.Screen
					name="Create"
					component={CalendarScreenNavigator}
					options={{
						tabBarLabel: () => null,
						tabBarIcon: () => (
							<View accessible={true} accessibilityLabel="Add Card">
								<TabBarIcon
									name="plus-circle"
									size={38}
									color={themeStyle['color-primary-300']}
								/>
							</View>
						),
					}}
					listeners={({ navigation }) => ({
						tabPress: (e) => {
							e.preventDefault();
							navigation.navigate('CreateCardModal');
						},
					})}
				/>
				{/* implemented later in next iteration cycle */}
				<BottomTab.Screen 
					name="Game" 
					component={GameScreen}
					options={{
						tabBarIcon: ({ color }) => (
							<View accessible={true} accessibilityLabel="Minigames">
								<TabBarIcon
									name="gamepad"
									color={color}
								/> 
							</View>
						)
					}} 
				/>
				{/* <BottomTab.Screen name="Social" component={SocialScreen} /> */}
			</BottomTab.Navigator>
		</>
	);
};

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const DashboardStack = createStackNavigator<DashboardParamList>();

function DashboardScreenNavigator() {
	return (
		<DashboardStack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
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
				headerShown: false,
			}}
		>
			<CalendarStack.Screen name="CalendarScreen" component={CalendarScreen} />
		</CalendarStack.Navigator>
	);
}

export default HomeTab;
