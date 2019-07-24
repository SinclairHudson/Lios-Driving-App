/*
==========================================================================
Author: Sinclair Hudson for Wawanesa Insurance Innovation Lab Kitchener.
Date: June 2019
IDE: Webstorm 2019 (Highly Recommended)
Description:
This project is called Lios, the Driving Application. It was created by myself, Sinclair Hudson, and the
backend was handled by Makalp Patel, my fellow coop. The application is used to monitor the user's driving
statistics and report that to the insurance company for accurate billing. It uses the accelerometer in the phone,
as well as the speed data from the GPS, to collect data while the user is driving. This data is analysed to give the
user a score out of 100. So, if the user is consistently speeding, breaking hard, swerving, etc. the sensors in the
phone will pick up that motion, and it would contribute to a lower score. The app should function as more of a rewards
program than a punitive monitoring system, with deductibles on car insurance for higher scores.
==========================================================================
 */

import React from 'react';
import {createAppContainer} from 'react-navigation';
import SettingsScreen from "./src/components/SettingsScreen";
import DrivingScreen from "./src/components/DrivingScreen";
import AnalyticsScreen from "./src/components/AnalyticsScreen";
import HomeScreen from "./src/components/HomeScreen";
import DataScreen from "./src/components/DataScreen";
import {Icon} from 'react-native-elements';

import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";

//App.js is where the navigator lives. This is a bottom tab navigator, for simplicity.
//There are 5 buttons: Home, Settings, Analytics, Drive, and Data
//Data is dedicated to viewing all the AsyncStorage, and it's just for debugging.


//this const defines the different screens, and it's pretty easy to follow. All the screens are just components,
// that render when the user navigates over there. I've tried passing data in between these objects using properties,
//but I can't get it to work. I just pass things using asyncstorage, because it's fast enough on my phone.
const TabNavigator = createMaterialBottomTabNavigator({
        Home: {
            screen: HomeScreen,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Home',
                tabBarIcon: ({tintColor}) => (<Icon style={[{color: tintColor}]} name='home'
                                                    type='material' color='white' onPress={()=>navigation.navigate('Home', {date: new Date()})}/>),
                gesturesEnabled: false,
            })
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                tabBarLabel: 'Settings',
                tabBarIcon: ({tintColor}) => (<Icon style={[{color: tintColor}]} name='settings'
                                                    type='material' color='white' />),
                gesturesEnabled: false,
            }
        },
        Analytics: {
            screen: AnalyticsScreen,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Analytics',
                tabBarIcon: ({tintColor}) => (<Icon style={[{color: tintColor}]} name='timeline'
                                                    type='material' color='white' onPress={()=>navigation.navigate('Analytics', {date: new Date()})}/>),
                gesturesEnabled: false,
            })
        },
        Driving: {
            screen: DrivingScreen,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: 'Driving',
                tabBarIcon: ({tintColor}) => (<Icon style={[{color: tintColor}]} name='drive-eta'
                                                    type='material' color='white' onPress={()=>navigation.navigate('Driving', {date: new Date()})}/>),
                gesturesEnabled: false,
            })
        },
        Data: {
            screen: DataScreen,
            navigationOptions: {
                tabBarLabel: 'Data',
                tabBarIcon: ({tintColor}) => (<Icon style={[{color: tintColor}]} name='data-usage'
                                                    type='material' color='white'/>),
                gesturesEnabled: false,
            }
        },
    },
    {
        initialRouteName: 'Home',
        activeColor: '#f0edf6',
        inactiveColor: '#3d5875',
        barStyle: {backgroundColor: '#152d44'},
        lazy: false
    }
);

export default createAppContainer(TabNavigator);