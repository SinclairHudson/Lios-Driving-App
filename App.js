import React from 'react';
import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import SettingsScreen from "./src/components/SettingsScreen";
import DrivingScreen from "./src/components/DrivingScreen";
import AnalyticsScreen from "./src/components/AnalyticsScreen";
import HomeScreen from "./src/components/HomeScreen";
import DataScreen from "./src/components/DataScreen";
import {Icon} from 'react-native-elements'
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";

const TabNavigator = createMaterialBottomTabNavigator({
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({tintColor}) => (<Icon style={[{color: tintColor}]} name='home'
                                                    type='material' color='white'/>),
                gesturesEnabled: false,
            }
        },
        Settings: {
            screen: SettingsScreen,
            navigationOptions: {
                tabBarLabel: 'Settings',
                tabBarIcon: ({tintColor}) => (<Icon style={[{color: tintColor}]} name='settings'
                                                    type='material' color='white'/>),
                gesturesEnabled: false,
            }
        },
        Analytics: {
            screen: AnalyticsScreen,
            navigationOptions: {
                tabBarLabel: 'Analytics',
                tabBarIcon: ({tintColor}) => (<Icon style={[{color: tintColor}]} name='timeline'
                                                    type='material' color='white'/>),
                gesturesEnabled: false,
            }
        },
        Driving: {
            screen: DrivingScreen,
            navigationOptions: {
                tabBarLabel: 'Driving',
                tabBarIcon: ({tintColor}) => (<Icon style={[{color: tintColor}]} name="drive-eta"
                                                    type="material" color='white'/>),
                gesturesEnabled: false,
            }
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