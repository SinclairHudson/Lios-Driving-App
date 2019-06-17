import React from 'react';
import { createBottomTabNavigator, createAppContainer, } from 'react-navigation';
import SettingsScreen from "./src/components/SettingsScreen";
import DrivingScreen from "./src/components/DrivingScreen";
import AnalyticsScreen from "./src/components/AnalyticsScreen";
import HomeScreen from "./src/components/HomeScreen";

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
  Analytics: AnalyticsScreen,
  Driving: DrivingScreen,
});

export default createAppContainer(TabNavigator);