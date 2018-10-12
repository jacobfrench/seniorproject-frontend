import React from 'react';
import CustomDrawerContentComponent from 'app/src/navigation/DrawerNavHeader';
import HeaderButtons from 'react-navigation-header-buttons';
import { store } from 'app/src/redux/store';
import { Ionicons } from '@expo/vector-icons';

import {
  LoginScreen,
  SignUpScreen,
  HomeScreen,
  ForgotPasswordScreen,
  SettingsScreen,
  BusinessEditScreen,
  MenuEditScreen
} from 'app/src/screens';

import {
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from 'react-navigation';

const theme = store.getState().settings.theme;

const styles = {
  mainHeader: {
    backgroundColor: theme.primary_dark
  },
  mainHeaderTitle: {
    color: theme.text
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
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Nearby',
      headerStyle: styles.mainHeader,
      headerTitleStyle: styles.mainHeaderTitle,
      headerLeft: (
        <HeaderButtons IconComponent={Ionicons} iconSize={32} color={theme.text}>
            <HeaderButtons.Item title='drawer' iconName='md-menu' onPress={() => navigation.toggleDrawer()} />
        </HeaderButtons>

      ),
    })
  }
});

const FavoritesStack = createStackNavigator({
  Favorites: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Favorites',
      headerStyle: styles.mainHeader,
      headerTitleStyle: styles.mainHeaderTitle,
      headerLeft: (
        <HeaderButtons IconComponent={Ionicons} iconSize={32} color={theme.text}>
            <HeaderButtons.Item title='drawer' iconName='md-menu' onPress={() => navigation.toggleDrawer()} />
        </HeaderButtons>
      ),
    })
  }
});

const MapStack = createStackNavigator({
  Map: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Map',
      headerStyle: styles.mainHeader,
      headerTitleStyle: styles.mainHeaderTitle,
      headerLeft: (
        <HeaderButtons IconComponent={Ionicons} iconSize={32} color={theme.text}>
            <HeaderButtons.Item title='drawer' iconName='md-menu' onPress={() => navigation.toggleDrawer()} />
        </HeaderButtons>

      ),
    })
  }
});

//Home page navigator ======================================================================================================
const TabNav = createBottomTabNavigator({
  Nearby: {
    screen: NearbyStack,
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => <Ionicons name='md-home' size={24} color={tintColor}/>
    }
  },
  Favorites: {
    screen: FavoritesStack,
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => <Ionicons name='md-star' size={24} color={tintColor}/>
    }
  },
  Map: {
    screen: MapStack,
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => <Ionicons name='md-map' size={24} color={tintColor}/>
    }
  }
}, {
  tabBarOptions: {
    activeTintColor: theme.primary_dark
  },
  initialRouteName: 'Nearby'
});

const Home = createStackNavigator({
  Tabs: TabNav,
}, {
  headerMode: 'none'
});

//Business page navigator ====================================================================================================
const BusinessEditTabs = createBottomTabNavigator({
  About: {
    screen: BusinessEditScreen,
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => <Ionicons name='md-information-circle' size={24} color={tintColor}/>
    }
  },
  Menu: {
    screen: MenuEditScreen,
    navigationOptions: {
      tabBarIcon: ({focused, tintColor}) => <Ionicons name='md-book' size={24} color={tintColor}/>
    }
  },
}, {
  tabBarOptions: {
    activeTintColor: theme.primary_dark
  },
  initialRouteName: 'About'
});

const BusinessStack = createStackNavigator({
  Tabs: BusinessEditTabs
}, {
  navigationOptions: ({ navigation }) => ({
    title: 'Info',
    headerStyle: styles.mainHeader,
    headerTitleStyle: styles.mainHeaderTitle,
    headerLeft: (
      <HeaderButtons IconComponent={Ionicons} iconSize={32} color={theme.text}>
          <HeaderButtons.Item title='drawer' iconName='md-menu' onPress={() => navigation.toggleDrawer()} />
      </HeaderButtons>
    ),
  })
});

//Settings Nav======================================================================================================
const SettingsStack = createStackNavigator({
  Settings: { 
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Settings',
      headerStyle: styles.mainHeader,
      headerTitleStyle: styles.mainHeaderTitle,
      headerLeft: (
        <HeaderButtons IconComponent={Ionicons} iconSize={32} color={theme.text}>
          <HeaderButtons.Item title='drawer' iconName='md-menu' onPress={() => navigation.toggleDrawer()} />
        </HeaderButtons>
      ),
  })
  }
});



const MainNav = createDrawerNavigator({
    Home: { 
      screen: Home, 
      navigationOptions: {
        drawerIcon: (<Ionicons name='md-home' size={24} color={theme.text}/>),
        tintColor: theme.text 
      }
    },
    Business: {
       screen: BusinessStack,
       navigationOptions: {
        drawerIcon: (<Ionicons name='md-briefcase' size={24} color={theme.text}/>),
        tintColor: theme.text 
      }
    },
    Settings: { 
      screen: SettingsStack, 
      navigationOptions: {
        drawerIcon: (<Ionicons name='md-settings' size={24} color={theme.text}/>),
        activeTintColor: theme.text,
      }
    },
  },
  {
    contentComponent: props => <CustomDrawerContentComponent {...props} />,
    activeTintColor: theme.primary
  }
);

export { AuthNav, MainNav };
