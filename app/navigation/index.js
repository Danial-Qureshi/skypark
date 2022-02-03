import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import globals from '../common/globals';
import Splash from './../container/Splash';
import LoginScreen from './../container/Authentication/LoginScreen';
import AuthenticationScreen from './../container/Authentication/AuthenticationScreen';
import {SafeAreaView, View, Text, Image} from 'react-native';
import {navigationRef} from './NavigationService';
import connect from 'react-redux/lib/connect/connect';
import SignUpScreen from '../container/Authentication/SignUpScreen';
import HomeScreen from '../container/Screens/HomeScreen';
import ProjectScreen from '../container/Screens/ProjectScreen';
import TabBarIconContainer from '../container/TabBarIconContainer';
import TabBarHomeContainer from '../container/TabBarHomeContainer';
import AccountScreen from '../container/Screens/AccountScreen';
import InquiriesScreen from '../container/Screens/InquiriesScreen';
import CartScreen from '../container/Screens/CartScreen';
import ProfileScreen from '../container/Screens/ProfileScreen';
import ChangePassword from '../container/Screens/ChangePassword';
import MyAddressesScreen from '../container/Screens/MyAddressesScreen';
import ForgetPassword from '../container/Authentication/ForgetPassword';
import VerifyOTPScreen from '../container/Authentication/VerifyOTPScreen';
import ResetPasswordScreen from '../container/Authentication/ResetPasswordScreen';
import Notifications from '../container/Screens/Notifications';
import PhoneVerification from '../container/Authentication/PhoneVerification';

const mapStateToProps = ({user, app, carts}) => ({
  app,
  user,
});

const tabIcons = [
  require('../Images/search.png'),
  require('../Images/deal.png'),
  require('../Images/account.png'),
  require('../Images/cart.png'),
];
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

@connect(mapStateToProps)
class AppStack extends React.Component {
  render() {
    return (
      <Stack.Navigator initialRouteName={'Splash'}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AuthenticationScreen"
          component={AuthenticationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={homeTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyAddressesScreen"
          component={MyAddressesScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerifyOTPScreen"
          component={VerifyOTPScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notifications"
          component={Notifications}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PhoneVerification"
          component={PhoneVerification}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
}

const homeTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: globals.darkBlackgrey,
        activeTintColor: globals.theme_color,
        style: {
          backgroundColor: globals.lightgrey,
        },
        showLabel: false,
      }}
      initialRouteName={'Home'}
      backBehavior={'none'}
      lazy={false}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let tintColor;
          let SelectedStyle;
          if (route.name === 'Search') {
            iconName = tabIcons[0];
          } else if (route.name === 'Project') {
            iconName = tabIcons[1];
          } else if (route.name === 'Inquirie') {
            iconName = tabIcons[2];
          } else if (route.name === 'Cart') {
            iconName = tabIcons[3];
          } else if (route.name === 'home') {
            iconName = tabIcons[2];
          }
          tintColor = focused ? globals.theme_color : globals.darkBlackgrey;
          return <TabBarIconContainer icon={iconName} tintColor={tintColor} />;
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarHomeContainer isFocused={focused} />
          ),
        }}
      />
      <Tab.Screen name="Project" component={ProjectScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Inquirie" component={InquiriesScreen} />
    </Tab.Navigator>
  );
};

class AppNavigator extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer ref={navigationRef}>
          <AppStack />
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

export default AppNavigator;
