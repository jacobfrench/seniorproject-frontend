import React from 'react';
import CustomDrawerContentComponent from 'app/src/navigation/DrawerNavHeader';
import HeaderButtons from 'react-navigation-header-buttons';
import { store } from 'app/src/redux/store';
import { Ionicons } from '@expo/vector-icons';

import {
	SettingsScreen,
  MapViewScreen,
  NearbyScreen,
  FavoritesScreen
} from 'app/src/screens';

// Auth Stack
import {
	ForgotPasswordScreen,
	LoginScreen,
	SignUpScreen
} from 'app/src/screens/auth';

// Business Stack
import {
	BusinessEditScreen,
	MenuEditScreen,
	BusinessTestScreen,
	BusinessOptionsScreen,
	MenuItemEditScreen,

} from 'app/src/screens/business';

// Messaging Stack
import {
  ConversationScreen,
  ChatScreen,
} from 'app/src/screens/messaging'

import {
	createStackNavigator,
	createDrawerNavigator,
	createBottomTabNavigator,
	createMaterialTopTabNavigator
} from 'react-navigation';

const theme = store.getState().settings.theme;

const styles = {
	mainHeader: {
		backgroundColor: theme.primaryVariant
	},
	mainHeaderTitle: {
		color: theme.primary
	}
};

const AuthNav = createStackNavigator({
	Login: {
		screen: LoginScreen,
		navigationOptions: {
			header: null
		}
	},
	SignUp: {
		screen: SignUpScreen,
		navigationOptions: {
			header: null
		}
	},
	ForgotPassword: {
		screen: ForgotPasswordScreen,
		navigationOptions: {
			header: null
		}
	}
});

//BottomTabNavigator Screens
const NearbyStack = createStackNavigator({
	Nearby: {
		screen: NearbyScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Nearby',
			headerStyle: styles.mainHeader,
			headerTitleStyle: styles.mainHeaderTitle,
			headerLeft: (
				<HeaderButtons IconComponent={Ionicons} iconSize={32} color={theme.primary}>
					<HeaderButtons.Item title='drawer' iconName='md-menu' onPress={() => navigation.toggleDrawer()} />
				</HeaderButtons>

			),
		})
	}
});

const FavoritesStack = createStackNavigator({
	Favorites: {
		screen: FavoritesScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Favorites',
			headerStyle: styles.mainHeader,
			headerTitleStyle: styles.mainHeaderTitle,
			headerLeft: (
				<HeaderButtons IconComponent={Ionicons} iconSize={32} color={theme.primary}>
					<HeaderButtons.Item title='drawer' iconName='md-menu' onPress={() => navigation.toggleDrawer()} />
				</HeaderButtons>
			),
		})
	}
});

const MapStack = createStackNavigator({
	Map: {
		screen: MapViewScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Map',
			headerStyle: styles.mainHeader,
			headerTitleStyle: styles.mainHeaderTitle,
			headerLeft: (
				<HeaderButtons IconComponent={Ionicons} iconSize={32} color={theme.primary}>
					<HeaderButtons.Item title='drawer' iconName='md-menu' onPress={() => navigation.toggleDrawer()} />
				</HeaderButtons>

			),
		})
	},
	BusinessView: {
		screen: BusinessTestScreen,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	}
});

//Home page navigator ======================================================================================================
const TabNav = createBottomTabNavigator({
	Nearby: {
		screen: NearbyStack,
		navigationOptions: {
			tabBarIcon: ({ focused, tintColor }) => <Ionicons name='md-home' size={24} color={tintColor} />
		}
	},
	Favorites: {
		screen: FavoritesStack,
		navigationOptions: {
			tabBarIcon: ({ focused, tintColor }) => <Ionicons name='md-star' size={24} color={tintColor} />
		}
	},
	Map: {
		screen: MapStack,
		navigationOptions: {
			tabBarIcon: ({ focused, tintColor }) => <Ionicons name='md-map' size={24} color={tintColor} />
		}
	}
}, {
		tabBarOptions: {
			activeTintColor: theme.primary
		},
		initialRouteName: 'Nearby'
	});

const Home = createStackNavigator({
	Tabs: TabNav,
}, {
		headerMode: 'none'
	});

//Business edit page navigator ====================================================================================================
const BusinessStack = createStackNavigator({
	BusinessOptionsScreen: {
		screen: BusinessOptionsScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Options',
			headerStyle: styles.mainHeader,
			headerTitleStyle: styles.mainHeaderTitle,
			headerLeft: (
				<HeaderButtons
					IconComponent={Ionicons}
					iconSize={32}
					color={theme.primary}
				>
					<HeaderButtons.Item
						title='drawer'
						iconName='md-menu'
						onPress={() => navigation.toggleDrawer()}
					/>
				</HeaderButtons>
			),
		})
	}, 
	EditBusiness: {
		screen: BusinessEditScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Edit Information',
			headerStyle: styles.mainHeader,
			headerTitleStyle: styles.mainHeaderTitle,
			headerLeft: (
				<HeaderButtons
					IconComponent={Ionicons}
					iconSize={32}
					color={theme.primary}
				>
					<HeaderButtons.Item
						title='drawer'
						iconName='md-menu'
						onPress={() => navigation.toggleDrawer()}
					/>
				</HeaderButtons>
			),
		})
	},
	EditMenus: {
		screen: MenuEditScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Edit Menus',
			headerStyle: styles.mainHeader,
			headerTitleStyle: styles.mainHeaderTitle,
			headerLeft: (
				<HeaderButtons
					IconComponent={Ionicons}
					iconSize={32}
					color={theme.primary}
				>
					<HeaderButtons.Item
						title='drawer'
						iconName='md-menu'
						onPress={() => navigation.toggleDrawer()}
					/>
				</HeaderButtons>
			),
		})
	},
	PreviewBusiness: {
		screen: BusinessTestScreen,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	},
	EditMenuItems: {
		screen: MenuItemEditScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Edit Menu Items',
			headerStyle: styles.mainHeader,
		})
	},

	});

//Messaging Nav
const MessagingStack = createStackNavigator({
	ConversationScreen: {
		screen: ConversationScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Conversations',
			headerStyle: styles.mainHeader,
			headerTitleStyle: styles.mainHeaderTitle,
			headerLeft: (
				<HeaderButtons
					IconComponent={Ionicons}
					iconSize={32}
					color={theme.primary}
				>
					<HeaderButtons.Item
						title='drawer'
						iconName='md-menu'
						onPress={() => navigation.toggleDrawer()}
					/>
				</HeaderButtons>
			),
		})
	},
	ChatScreen: {
		screen: ChatScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Messages',
			headerStyle: styles.mainHeader,
			headerTitleStyle: styles.mainHeaderTitle,
			headerLeft: (
				<HeaderButtons
					IconComponent={Ionicons}
					iconSize={32}
					color={theme.primary}
				>
					<HeaderButtons.Item
						title='drawer'
						iconName='md-menu'
						onPress={() => navigation.toggleDrawer()}
					/>
				</HeaderButtons>
			),
		})
	},
}, {

	})

//Settings Nav======================================================================================================
const SettingsStack = createStackNavigator({
	Settings: {
		screen: SettingsScreen,
		navigationOptions: ({ navigation }) => ({
			title: 'Settings',
			headerStyle: styles.mainHeader,
			headerTitleStyle: styles.mainHeaderTitle,
			headerLeft: (
				<HeaderButtons
					IconComponent={Ionicons}
					iconSize={32}
					color={theme.primary}
				>
					<HeaderButtons.Item
						title='drawer'
						iconName='md-menu'
						onPress={() => navigation.toggleDrawer()}
					/>
				</HeaderButtons>
			),
		})
	}
});

const MainNav = createDrawerNavigator({
	Home: {
		screen: Home,
		navigationOptions: {
			drawerIcon: (<Ionicons name='md-home' size={24} color={theme.onBackground} />),
			tintColor: theme.onBackground,
		}
	},
	Business: {
		screen: BusinessStack,
		navigationOptions: {
			drawerIcon: (<Ionicons name='md-briefcase' size={24} color={theme.onBackground} />),
			tintColor: theme.onBackground
		}
	},
	Inbox: {
		screen: MessagingStack,
		navigationOptions: {
			drawerIcon: (<Ionicons name='md-chatboxes' size={24} color={theme.onBackground} />),
			tintColor: theme.onBackground
		}
	},
	Settings: {
		screen: SettingsStack,
		navigationOptions: {
			drawerIcon: (<Ionicons name='md-settings' size={24} color={theme.onBackground} />),
			activeTintColor: theme.onBackground,
		}
	},
},
	{
		contentComponent: props => <CustomDrawerContentComponent {...props} />,
		activeTintColor: theme.primary
	}
);

export { AuthNav, MainNav };
